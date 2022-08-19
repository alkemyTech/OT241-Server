const app = require("../app");
const request = require("supertest");

const anActivityObject = {
  name: "A activities title",
  content: "A string text with the content of the activities",
  image: "http://www.image.com/activities-image",
};
const anInvalidActivityObject = {
  name: "",
  content: "A short string",
  image: 2,
};
const anActivityObjectUpdate = {
  name: "A activities title updated",
  content: "A string text with the content of the activities updated",
  image: "http://www.image.com/activities-image",
};

describe("activities: ", () => {
  let beforeResponse;
  beforeEach(async () => {
    const { body: activities } = await request(app).post("/activities").send(anActivityObject);
    beforeResponse = activities;
  });

  describe("GET /activities", () => {
    test("Should respond with a 200", async () => {
      const response = await request(app).get("/activities");
      expect(response.statusCode).toBe(200);
    });
    test("response must be an Array of Objects", async () => {
      const response = await request(app).get("/activities");
      expect(response.body[0]).toBeDefined();
      expect(response.body[0].name).toBeDefined();
    });
  });

  describe("POST /activities", () => {
    test("Should respond with a 200 using a valid body and", async () => {
      const response = await request(app).post("/activities").send(anActivityObject);
      expect(response.statusCode).toBe(200);
    });
    test("should create a new activity", async () => {
      const response = await request(app).post("/activities").send(anActivityObject);
      expect(response.statusCode).toBe(200);
    });
    test("response must be an Object", async () => {
      const response = await request(app).post("/activities").send(anActivityObject);
      expect(response.body).toBeInstanceOf(Object);
    });
    test("Should validate the fields name and content", async () => {
      const response = await request(app).post("/activities").send(anInvalidActivityObject);
      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].msg).toBeDefined();
    });
  });

  describe("GET /activities/:id", () => {
    let beforeResponse;
    beforeEach(async () => {
      const { body: activities } = await request(app).post("/activities").send(anActivityObject);
      beforeResponse = activities;
    });
    test("Should respond with a 200 using a valid id", async () => {
      const response = await request(app).get(`/activities/${beforeResponse.id}`);
      expect(response.statusCode).toBe(200);
    });
    test("Response must be an Object", async () => {
      const response = await request(app).get(`/activities/${beforeResponse.id}`);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe("PUT /activities/:id", () => {
    test.skip("Should update a activity", async (done) => {
      const response = await request(app)
        .put(`/activities/${beforeResponse.id}`)
        .send(anActivityObjectUpdate);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.name).toHaveLength(26);
    }, 7000);
  });

  describe("DELETE /activities/:id", () => {
    test("Should delete a activity", async () => {
      const response = await request(app).delete(`/activities/${beforeResponse.id}`);
      expect(response.statusCode).toBe(200);
    });
  });
});
