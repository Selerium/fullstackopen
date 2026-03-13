const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001;

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

app.use(express.static("dist"));
app.use(express.json());
app.use((req, res, next) => {
  const oldJson = res.json;

  res.json = function (body) {
    res.locals.body = body;
    return oldJson.call(this, body);
  };

  next();
});

morgan.token("res-body", (req, res) => JSON.stringify(res.locals.body));

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :res-body"
  )
);

app.get("/api/persons", (request, response) => response.json(phonebook));

app.post("/api/persons", (request, response) => {
  const record = request.body;

  if (!record["name"] || !record["number"]) {
    response.json({ error: "incomplete fields sent" });
  } else if (phonebook.find((list) => list.name === record["name"])) {
    response.json({ error: "name must be a unique value" });
  } else {
    record["id"] = getRandomInt(1000000);
    phonebook = phonebook.concat(record);

    response.send(record);
  }
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const record = phonebook.find((item) => item.id === id);
  if (record) response.json(record);
  else {
    response.statusMessage = "Record not found";
    response.status(404).send();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phonebook = phonebook.filter((record) => record.id != id);
  response.status(204).send();
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(`\
    <p>Phonebook has info for ${phonebook.length} people</p>\
    <p>${date}</p>\
    `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
