import {Field, InputType, Int, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
@ObjectType()
export class Class extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  year: number;
}

@InputType()
export class NewClassInput {
  @Field()
  name: string;

  @Field()
  year: number;
}

@InputType()
export class UpdateClassInput {
  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  year?: number;
}
