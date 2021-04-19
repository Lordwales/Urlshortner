/* prettier-ignore-file */
//process.env.NODE_ENV = 'development';

const mongoose = require("mongoose");
const Shortner = require("./models/shortnerModel");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./app");
const server = require("./server");
//const should = chai.should();
const should = require("should");

chai.use(chaiHttp);

describe("Shortner", () => {
  describe("/POST shortner", () => {
    it("it should not POST a URL without initialUrl field", async () => {
      let shortner = "http://jjj.com";
      chai
        .request(server)
        .post("/api/v1/shortner")
        .send(shortner)
        .end((res) => {
          should(res.status).be.equal(400);
          should(res.body).be.a("object");
          should(res.body).have.property("errors");
          // should(res.body).errors.have.property("initialUrl");
          // should(res.body).errors.pages.have.property("kind").eql("required");
          done();
        });
      //.catch(done);
    });
    it("it should CREATE a shortUrl ", async () => {
      let shortner = {
        initialUrl: "https://github.com/ai/nanoid",
      };
      chai
        .request(server)
        .post("/api/v1/shortner")
        .send(shortner)
        .end((res) => {
          should.exist(res.body);
          should(res.status).be.equal(200);
          should(res.body).be.a("object");
          should(res.body).shortner.have.property("shortUrl");
          should(res.body).shortner.have.property("urlCode");
          done();
        });
    });

    it("it should not allow invalid url ", async () => {
      let shortner = {
        initialUrl: "kkkk",
      };
      chai
        .request(server)
        .post("/api/v1/shortner")
        .send(shortner)
        .end((res) => {
          should(res.status).be.equal(400);
          //should(res.body).have.property("error");
          done();
        });
    });
  });
  describe("/GET/:code shortner", () => {
    it("it should redirect", async () => {
      let shortUrl = "http://localhost:3000/A1FYOZtOUo";

      chai
        .request(server)
        .get(shortUrl)
        .send()
        .end((res) => {
          should(res.status).be.equal(200);
          done();
        });
    });
  });
});
