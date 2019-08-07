require("dotenv").config();

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const {
    User, 
    Chef, 
} = require("../models");



chai.should();
chai.use(chaiHttp);

let chefId = null, token = null;

const testChef = {
    username: "Test Chef",
    email: "testchef@email.com",
    password: "password",
    type: "chef"
}


/**
 *  Attempt to create test chef
 */
describe("/POST to /signup with valid new Chef user.", () => {
  it("it should return a token, and have status 201", done => {
    chai
      .request(app)
      .post(`/signup`)
      .send(testChef)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have
          .property("token");

        console.dir(res.body);

        // Collect id of created test chef
        chefId = res.body.user._id;
        token = res.body.token;
        done();
      });
  });
});

describe("/PUT to /chef/:chefId with valid update and authentic token.", () => {
  it("it should have status 200", done => {
    chai
      .request(app)
      .put(`/chef/${chefId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({description: "I AM CHEF. MAKE FOOD GOOD."})
      .end((err, res) => {
        res.should.have.status(200);
        
        done();
      });
  });
});


describe("/POST to /signup with duplicate email.", () => {
    it("it should fail with a status of 422", done => {
      chai
        .request(app)
        .post(`/signup`)
        .send(testChef)
        .end(async (err, res) => {
          res.should.have.status(422);
          
          // Delete testChef document
          await Chef.findByIdAndRemove(chefId);
          done();
        });
    });
  });
