import db from "./db"

// eslint-disable-next-line import/prefer-default-export
export async function clearDB() {
  const runner = db.createQueryRunner()
  try {
    await runner.query("SET session_replication_role = 'replica'")
    await Promise.all(
      db.entityMetadatas.map(async (entity) => {
        try {
          await runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`)
        } catch (error) {
          console.error(`Failed to disable triggers for table "${entity.tableName}":`, error)
        }
      })
    )
    await Promise.all(
      db.entityMetadatas.map(async (entity) => {
        try {
          await runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`)
        } catch (error) {
          console.error(`Failed to drop table "${entity.tableName}":`, error)
        }
      })
    )
    await runner.query("SET session_replication_role = 'origin'")
    await db.synchronize()
  } catch (error) {
    console.error("Error while clearing database:", error)
  } finally {
    await runner.release()
  }
}

async function main() {
  try {
    await db.initialize()

    await clearDB()

    await db.destroy()
  } catch (error) {
    console.error("Error in main function:", error)
  }
  // eslint-disable-next-line no-restricted-syntax
  console.log("Database reset done.")
}

main()
