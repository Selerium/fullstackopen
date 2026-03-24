const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const mongoose = require("mongoose");

const initData = [
  {
    username: "bobiscool",
    password: "bobiscool",
    name: "bob",
  },
  {
    username: "charlieiscool",
    password: "charlieiscool",
    name: "charlie",
  },
  {
    username: "jennyiscool",
    password: "jennyiscool",
    name: "jenny",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(initData);
});

after(() => {
  mongoose.connection.close();
});

const api = supertest(app);

describe("/api/users", async () => {
  test("get users", async () => {
    const result = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(initData.length, result.body.length);
  });

  test("create a user", async () => {
    await api
      .post("/api/users")
      .send({
        username: "test",
        password: "test",
        name: "test",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  describe("can't create", async () => {
    test("password too short", async () => {
      await api
        .post("/api/users")
        .send({
          username: "test",
          password: "te",
          name: "test",
        })
        .expect(400);
    });

    test("username too short", async () => {
      await api
        .post("/api/users")
        .send({
          username: "te",
          password: "test",
          name: "test",
        })
        .expect(400);
    });

    test("username not unique", async () => {
      await api
        .post("/api/users")
        .send({
          username: "bobiscool",
          password: "test",
          name: "test",
        })
        .expect(400);
    });
  });
});
