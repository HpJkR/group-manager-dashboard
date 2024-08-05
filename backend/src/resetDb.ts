import db from "./db";
import {Student} from "./entities/Student";
import {Class} from "./entities/Class";
import {faker} from '@faker-js/faker';

// Function to clear the database
export async function clearDB() {
  const runner = db.createQueryRunner();
  try {
    await runner.query("SET session_replication_role = 'replica'");

    // Disable triggers for all tables
    await Promise.all(
      db.entityMetadatas.map(async (entity) => {
        try {
          await runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`);
        } catch (error) {
          console.error(`Failed to disable triggers for table "${entity.tableName}":`, error);
        }
      })
    );

    // Drop all tables
    await Promise.all(
      db.entityMetadatas.map(async (entity) => {
        try {
          await runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`);
        } catch (error) {
          console.error(`Failed to drop table "${entity.tableName}":`, error);
        }
      })
    );

    await runner.query("SET session_replication_role = 'origin'");
    await db.synchronize(); // Recreate tables and synchronize schema
  } catch (error) {
    console.error("Error while clearing database:", error);
  } finally {
    await runner.release();
  }
}

// Function to insert classes
async function insertClasses() {
  const classes = [];
  for (let i = 1; i <= 10; i++) {
    const classEntity = Class.create({
      name: `Class${i}`,
      year: 2024
    });
    classes.push(classEntity);
  }
  await Class.save(classes);
}

// Function to insert students and associate them with classes
async function insertStudents() {
  // Fetch all classes from the database
  const classes = await Class.find();

  if (classes.length === 0) {
    throw new Error("No classes found. Make sure to insert classes before students.");
  }

  const students = [];
  for (let i = 1; i <= 300; i++) {
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@example.com`;

    const student = Student.create({
      firstname,
      lastname,
      email, // Generated email
      telephone: faker.phone.number(),
      avatar: faker.image.avatar(),
      class: randomClass // Associate the student with a random class
    });
    students.push(student);
  }
  await Student.save(students);
}

// Main function to run the script
async function main() {
  try {
    await db.initialize();

    await clearDB();

    await insertClasses();

    await insertStudents();

    await db.destroy();
  } catch (error) {
    console.error("Error in main function:", error);
  }
  console.log("Database reset and initial data insertion done.");
}

main();
