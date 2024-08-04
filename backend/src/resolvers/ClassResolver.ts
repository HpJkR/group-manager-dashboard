import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import {Class, NewClassInput, UpdateClassInput} from "../entities/Class";

@Resolver()
class ClassResolver {
  @Query(() => [Class])
  async getAllClasses(): Promise<Class[]> {
    return await Class.find();
  }

  @Query(() => Class, {nullable: true})
  async getClassById(@Arg("id", () => Int) id: number): Promise<Class | null> {
    return await Class.findOne({where: {id}}); // Correctly use FindOneOptions
  }

  @Query(() => [Class])
  async getClassesByName(@Arg("name") name: string): Promise<Class[]> {
    return await Class.find({where: {name}});
  }

  @Mutation(() => Class)
  async addClass(@Arg("data") newClassData: NewClassInput): Promise<Class> {
    const classEntity = Class.create({
      name: newClassData.name,
      year: newClassData.year
    });

    return await classEntity.save();
  }

  @Mutation(() => Class, {nullable: true})
  async updateClass(
    @Arg("id", () => Int) id: number,
    @Arg("data") updateClassData: UpdateClassInput
  ): Promise<Class | null> {
    const classEntity = await Class.findOne({where: {id}});
    if (!classEntity) {
      throw new Error("Class not found!");
    }

    Object.assign(classEntity, updateClassData);
    await classEntity.save();
    return classEntity;
  }

  @Mutation(() => Boolean)
  async deleteClass(@Arg("id", () => Int) id: number): Promise<boolean> {
    const result = await Class.delete(id);
    return result.affected !== 0;
  }
}

export default ClassResolver;
