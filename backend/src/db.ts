import {DataSource} from "typeorm"
import env from "./env"

const {DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_HOST} = env

const db = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [],
  synchronize: true,
})

export async function clearDB() {
  const entities = db.entityMetadatas
  const tableNames = entities.map((entity) => `"${entity.tableName}"`).join(", ")
  await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`)
}

export default db
