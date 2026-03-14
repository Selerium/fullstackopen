const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

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

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", async (request, response, next) => {
  const record = request.body;

  if (!record["name"] || !record["number"]) {
    response.json({ error: "incomplete fields sent" });
  } else {
    const check = await Person.exists({ name: record["name"] });
    if (!check) {
      const newPerson = new Person({
        name: record["name"],
        number: record["number"],
      });

      newPerson
        .save()
        .then((result) => response.json(result))
        .catch((error) => next(error));
    } else {
      response.status(400).json({ error: "duplicate name" });
    }
  }
});

app.get("/api/persons/:id", async (request, response, next) => {
  Person.findById(request.params.id)
    .then((record) => {
      if (record) response.json(record);
      else {
        response.status(404).json({ error: "record not found" });
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", async (request, response, next) => {
  const record = request.body;

  if (!record["name"] || !record["number"]) {
    response.status(400).json({ error: "missing request fields" });
  } else {
    await Person.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    })
      .then((result) => response.json(result))
      .catch((error) => next(error));
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  await Person.findByIdAndDelete(request.params.id).catch((error) =>
    next(error)
  );
  response.status(204).send();
});

app.get("/info", (request, response, next) => {
  const date = new Date();
  response.send(`\
    <p>Phonebook has info for ${phonebook.length} people</p>\
    <p>${date}</p>\
    `);
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError")
    return response.status(400).send({ error: "incorrect request fields" });

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
