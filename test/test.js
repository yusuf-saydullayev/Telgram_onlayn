const chai = require('chai');
const chaihttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaihttp)

describe("Test GET method", () => {
    it("Sahifa testdan o'tdi", (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })

    })
})
