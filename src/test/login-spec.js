"use strict";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);
let server = "http://localhost:3000/api";

describe("/POST Login", () => {
  it("Should log in a user", (done) => {
    const loginForm = {
      email: "s@gmail.com",
      password: "098765432",
    };
    chai
      .request(server)
      .post("/login")
      .send(loginForm)
      .end((_err, _res) => {
        console.log(_res.body);
        _res.should.have.status(202);
        _res.body.should.have.property("ok").eql(true);
        _res.body.should.have.property("user").eql("6091c99d0a97e91278131cc5");
        _res.body.should.be.a("object");
        done();
      });
  });
});
