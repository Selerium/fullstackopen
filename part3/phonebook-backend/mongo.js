const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("password required");
  process.exit(1);
}

const db_password = process.argv[2];

mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://johnadithya008_db_user:${db_password}@fullstackopen.bxrwquz.mongodb.net/?appName=fullstackopen`,
  { family: 4 }
);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 3) {
  console.log("phonebook:");
  Person.find({}).then((person) => {
    person.forEach((record) => console.log(`${record.name} ${record.number}`));
    mongoose.connection.close();
    process.exit(0);
  });
}

if (process.argv.length == 5) {
  const newName = process.argv[3];
  const newNumber = process.argv[4];

  const newPerson = new Person({
    name: newName,
    number: newNumber,
  });

  newPerson.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    process.exit(0);
  });
}
