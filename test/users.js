import supertest from "supertest";
import { expect } from "chai";
const request = supertest("https://gorest.co.in/public/v2/");

let TOKEN = "dc145be4a5f331da2b0e45386d99244e5d1ec3b3d6dd8f2e074a9c25276c8939";

describe("Users", () => {
  let userId;

  describe("POST", () => {
    it("/users", () => {
      const data = {
        email: `test${Math.floor(Math.random() * 9999)}@email.co.id`,
        name: "Test Name",
        gender: "Male",
        status: "Inactive",
      };

      return request
        .post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res._body.email).to.equal(data.email);
          userId = res._body.id;
        });
    });
  });

  describe("GET", () => {
    it("/users", () => {
      request.get(`users?access-token=${TOKEN}`).end((err, res) => {
        expect(res.status).to.equal(200);
      });

      // return request.get(`users?access-token=${TOKEN}`).then((res) => {
      //   expect(res.status).to.equal(200);
      // });
    });

    it("/users:id", () => {
      return request
        .get(`users/${userId}?access-token=${TOKEN}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.status).to.equal(200);
        });
    });
  });

  describe("DELETE", () => {
    it("/users:id", () => {
      return request
        .delete(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.status).to.equal(204);
        });
    });
  });
});
