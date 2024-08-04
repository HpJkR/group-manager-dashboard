import {DataSource} from "typeorm"
import env from "./env"
import {Student} from "./entities/Student";
import {Class} from "./entities/Class";

const {DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_HOST} = env

const db = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [Student, Class],
  synchronize: true,
})

export async function clearDB() {
  const entities = db.entityMetadatas
  const tableNames = entities.map((entity) => `"${entity.tableName}"`).join(", ")
  await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`)
}

export default db
