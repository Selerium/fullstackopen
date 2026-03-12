const express = require("express");
const app = express();
const PORT = 3001;

const phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => response.json(phonebook));

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const record = phonebook.find(item => item.id === id)
  if (record) response.json(record);
  else {
    response.statusMessage = 'Record not found';
    response.status(404).send();
  }
})

app.get("/info", (request, response) => {
  const date = new Date()  
  response.send(`\
    <p>Phonebook has info for ${phonebook.length} people</p>\
    <p>${date}</p>\
    `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
