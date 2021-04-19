/* prettier-ignore-file */
//process.env.NODE_ENV = 'development';

let mongoose = require("mongoose");
let Shortner = require("./models/shortnerModel");

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("./app");
let should = chai.should();

chai.use(chaiHttp);

describe("Shortner", () => {
  describe("/POST shortner", () => {
    it("it should not POST a URL without initialUrl field", async () => {
      let shortner = "http://jjj.com";
      chai
        .request(app)
        .post("/api/v1/shortner")
        .send(shortner)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("initialUrl");
          res.body.errors.pages.should.have.property("kind").eql("required");
          done();
        });
      //.catch(done);
    });
    it("it should CREATE a shortUrl ", async () => {
      let shortner = {
        initialUrl: "https://github.com/ai/nanoid/",
      };
      chai
        .request(app)
        .post("/api/v1/shortner")
        .send(shortner)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql("success");
          res.body.shortner.should.have.property("initialUrl");
          done();
        });
    });
  });
  // describe('/GET/:id book', () => {
  //   it('it should GET a book by the given id', (done) => {
  //     let book = new Book({
  //       title: 'The Lord of the Rings',
  //       author: 'J.R.R. Tolkien',
  //       year: 1954,
  //       pages: 1170,
  //     });
  //     book.save((err, book) => {
  //       chai
  //         .request(server)
  //         .get('/book/' + book.id)
  //         .send(book)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('title');
  //           res.body.should.have.property('author');
  //           res.body.should.have.property('pages');
  //           res.body.should.have.property('year');
  //           res.body.should.have.property('_id').eql(book.id);
  //           done();
  //         });
  //     });
  //   });
  // });
  // describe('/PUT/:id book', () => {
  //   it('it should UPDATE a book given the id', (done) => {
  //     let book = new Book({
  //       title: 'The Chronicles of Narnia',
  //       author: 'C.S. Lewis',
  //       year: 1948,
  //       pages: 778,
  //     });
  //     book.save((err, book) => {
  //       chai
  //         .request(server)
  //         .put('/book/' + book.id)
  //         .send({
  //           title: 'The Chronicles of Narnia',
  //           author: 'C.S. Lewis',
  //           year: 1950,
  //           pages: 778,
  //         })
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('message').eql('Book updated!');
  //           res.body.book.should.have.property('year').eql(1950);
  //           done();
  //         });
  //     });
  //   });
  // });
  // /*
  //  * Test the /DELETE/:id route
  //  */
  // describe('/DELETE/:id book', () => {
  //   it('it should DELETE a book given the id', (done) => {
  //     let book = new Book({
  //       title: 'The Chronicles of Narnia',
  //       author: 'C.S. Lewis',
  //       year: 1948,
  //       pages: 778,
  //     });
  //     book.save((err, book) => {
  //       chai
  //         .request(server)
  //         .delete('/book/' + book.id)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have
  //             .property('message')
  //             .eql('Book successfully deleted!');
  //           res.body.result.should.have.property('ok').eql(1);
  //           res.body.result.should.have.property('n').eql(1);
  //           done();
  //         });
  //     });
  //   });
  // });
});
