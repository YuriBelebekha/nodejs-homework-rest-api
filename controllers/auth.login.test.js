// const mongoose = require('mongoose');
require('../server');
require("dotenv").config();
const app = require('../app');
const request = require('supertest');

const user = {
  email: "yuri4@mail.com",
  password: "123456",
};

describe("test login function", () => {
  test("check statusCode - 200", async () => {
    const response = await request(app).post('/users/login').send(user);
    expect(response.statusCode).toBe(200);
  });

  test("check if token is present", async () => {
    const response = await request(app).post('/users/login').send(user);
    expect(response.body.token).toBeTruthy();
  });

  test("check if user object has email & subscription fields and those fields are String type", async () => {
    const response = await request(app).post('/users/login').send(user);
    expect(typeof response.body.user).toBe('object');
    expect(response.body.user.email).toBeTruthy();
    expect(typeof response.body.user.email).toBe('string');
    expect(response.body.user.subscription).toBeTruthy();
    expect(typeof response.body.user.subscription).toBe('string');
  });
});
