import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import {NewStudentInput, Student, UpdateStudentInput} from "../entities/Student";
import {Class} from "../entities/Class";

@Resolver()
class StudentResolver {
  @Query(() => [Student])
  async getAllStudents() {
    return await Student.find({relations: ["class"]});
  }

  @Query(() => Student, {nullable: true})
  async getStudentById(@Arg("id", () => Int) id: number) {
    return await Student.findOne({where: {id}, relations: ["class"]});
  }

  @Query(() => [Student])
  async getStudentsByClass(@Arg("classId", () => Int) classId: number) {
    return await Student.find({where: {class: {id: classId}}, relations: ["class"]});
  }

  @Query(() => [Student])
  async getStudentsByLastname(@Arg("lastname") lastname: string) {
    return await Student.find({where: {lastname}, relations: ["class"]});
  }

  @Query(() => [Student])
  async getStudentsByFirstname(@Arg("firstname") firstname: string) {
    return await Student.find({where: {firstname}, relations: ["class"]});
  }

  @Mutation(() => Student)
  async addStudent(@Arg("data") newStudentData: NewStudentInput): Promise<Student> {
    const classEntity = await Class.findOne({where: {id: newStudentData.classId}});
    if (!classEntity) {
      throw new Error("Class not found!");
    }

    const student = Student.create({
      lastname: newStudentData.lastname,
      firstname: newStudentData.firstname,
      class: classEntity,
      email: newStudentData.email,
      telephone: newStudentData.telephone,
      avatar: newStudentData.avatar,
    });

    return await student.save();
  }

  @Mutation(() => Student, {nullable: true})
  async updateStudent(
    @Arg("id", () => Int) id: number,
    @Arg("data") updateStudentData: UpdateStudentInput
  ): Promise<Student | null> {
    const student = await Student.findOne({where: {id}, relations: ["class"]});
    if (!student) {
      throw new Error("Student not found!");
    }

    if (updateStudentData.firstname !== undefined) student.firstname = updateStudentData.firstname;
    if (updateStudentData.lastname !== undefined) student.lastname = updateStudentData.lastname;

    if (updateStudentData.classId !== undefined) {
      const classEntity = await Class.findOne({where: {id: updateStudentData.classId}});
      if (!classEntity) {
        throw new Error("Class not found!");
      }
      student.class = classEntity;
    }

    if (updateStudentData.email !== undefined) student.email = updateStudentData.email;
    if (updateStudentData.telephone !== undefined) student.telephone = updateStudentData.telephone;
    if (updateStudentData.avatar !== undefined) student.avatar = updateStudentData.avatar;

    await student.save();
    return student;
  }

  @Mutation(() => Boolean)
  async deleteStudent(@Arg("id", () => Int) id: number): Promise<boolean> {
    const result = await Student.delete(id);
    return result.affected !== 0;
  }
}

export default StudentResolver;
