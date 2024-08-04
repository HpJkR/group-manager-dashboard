import {buildSchema} from "type-graphql"
import StudentResolver from "./resolvers/StudentResolver";
import ClassResolver from "./resolvers/ClassResolver";

export default buildSchema({
  resolvers: [StudentResolver, ClassResolver],
})
