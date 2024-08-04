import {Field, InputType, Int, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Class} from "./Class";

@Entity()
@ObjectType()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  lastname: string;

  @Column()
  @Field()
  firstname: string;

  @Column({nullable: true})
  @Field({nullable: true})
  email?: string;

  @Column({nullable: true})
  @Field({nullable: true})
  telephone?: string;

  @Column({nullable: true})
  @Field({nullable: true})
  avatar?: string;

  @ManyToOne(() => Class, {nullable: true})
  @Field(() => Class, {nullable: true})
  class?: Class;
}

@InputType()
export class NewStudentInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field(() => Int)
  classId: number;

  @Field({nullable: true})
  email?: string;

  @Field({nullable: true})
  telephone?: string;

  @Field({nullable: true})
  avatar?: string;
}

@InputType()
export class UpdateStudentInput {
  @Field({nullable: true})
  firstname?: string;

  @Field({nullable: true})
  lastname?: string;

  @Field(() => Int, {nullable: true})
  classId?: number;

  @Field({nullable: true})
  email?: string;

  @Field({nullable: true})
  telephone?: string;

  @Field({nullable: true})
  avatar?: string;
}
