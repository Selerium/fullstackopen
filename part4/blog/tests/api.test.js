const supertest = require("supertest");
const { describe, test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const app = require("../app");
const Blog = require("../models/blog");
const mongoose = require("mongoose");

const initialData = [
  {
    title: "test1",
    author: "author1",
    url: "url1",
    likes: 1,
  },
  {
    title: "test2",
    author: "author2",
    url: "url2",
    likes: 2,
  },
  {
    title: "test3",
    author: "author3",
    url: "url3",
    likes: 3,
  },
];

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialData);
});

describe("verifying GET /api/blogs", () => {
  test("returns correct number of records", async () => {
    const result = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-type", /application\/json/);

    assert.strictEqual(initialData.length, result.body.length);
  });

  test.only("contains ID field", async () => {
    const result = await api.get("/api/blogs");

    assert.strictEqual(Object.hasOwn(result.body[0], "id"), true);
  });
});

describe("verifying POST /api/blogs", () => {
  test("creates a new post", async () => {
    const result = await api
      .post("/api/blogs")
      .send({
        title: "testTitle",
        author: "testAuthor",
        url: "testUrl",
        likes: 0,
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("likes default to 0", async () => {
    const result = await api
      .post("/api/blogs")
      .send({
        title: "testTitle",
        author: "testAuthor",
        url: "testUrl",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(0, result.body["likes"]);
  });

  test("title required field", async () => {
    await api
      .post("/api/blogs")
      .send({
        author: "testAuthor",
        url: "testUrl",
      })
      .expect(400);
  });

  test("url required field", async () => {
    await api
      .post("/api/blogs")
      .send({
        title: "testTitle",
        author: "testAuthor",
      })
      .expect(400);
  });
});

describe("veryfing DELETE /api/blogs/id", () => {
  test("valid ID", async () => {
    const result = await api.get("/api/blogs");

    await api
      .delete(`/api/blogs/${result.body[0]["id"].toString()}`)
      .expect(200);
  });

  test("non existent ID", async () => {
    await api.delete(`/api/blogs/69befe1173b42a0f197e5d3f`).expect(200);
  });

  test("invalid ID", async () => {
    await api.delete(`/api/blogs/fakeid`).expect(400);
  });
});

describe("veryfing PUT /api/blogs/id", () => {
  test.only("valid ID", async () => {
    const result = await api.get("/api/blogs");
    let newRecord = result.body[0];
    const routeId = newRecord.id.toString();
    newRecord.likes = 20;

    console.log(routeId);

    const updated = await api
      .put(`/api/blogs/${routeId}`)
      .send({
        title: newRecord.title,
        author: newRecord.author,
        url: newRecord.url,
        likes: 67,
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(updated.body.likes, 67);
  });

    test.only("non existent ID", async () => {
      await api.put(`/api/blogs/69befe1173b42a0f197e5d3f`).expect(200);
    });

    test.only("invalid ID", async () => {
      await api.delete(`/api/blogs/fakeid`).expect(400);
    });
});

after(() => {
  mongoose.connection.close();
});
