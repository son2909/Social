let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
const expect = require('chai').expect;
chai.use(chaiHttp);
describe('Users', async() => {
  beforeEach(async (done) => {
    done();
  });
  /*
   * Test the /GET route
   */
  describe('/GET users',() => {
    
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/api/v1/user/get-all-user')
        .end((err, res) => {
          expect(res.body).be.a('object');
          expect(res.body.status).eql(true);
          expect(res.body.data).be.a('array');
          expect(res.body.data.length).eql(7);
          expect(res.status).eql(200);
          done();
        });
    });
  });
  describe('/PUT/:user_id user', () => {
    it('it should Put user by id',(done) => {
      let user_id = "5ec78feea5a27e45d42b4617";
      chai.request(server)
        .put(`/api/v1/user/update/${user_id}`)
        .send({
          email: "sonlong7799@gmail.com",
          password: "123456",
          fullname: "Nguyễn Hữu Sơn"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(true);
          res.body.should.have.property('data').be.a('object');
          done();
        })
    })
  })
});