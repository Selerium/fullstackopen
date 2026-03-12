const express = require("express");
const app = express();
const PORT = 3001;

let phonebook = [
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.use(express.json())

app.get("/api/persons", (request, response) => response.json(phonebook));

app.post("/api/persons", (request, response) => {
  const record = request.body
  record['id'] = getRandomInt(1000000)
  phonebook = phonebook.concat(record)

  response.send(record)
})

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const record = phonebook.find(item => item.id === id)
  if (record) response.json(record);
  else {
    response.statusMessage = 'Record not found';
    response.status(404).send();
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phonebook = phonebook.filter(record => record.id !== id)
  response.status(204).send()
})

app.get("/info", (request, response) => {
  const date = new Date()  
  response.send(`\
    <p>Phonebook has info for ${phonebook.length} people</p>\
    <p>${date}</p>\
    `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
