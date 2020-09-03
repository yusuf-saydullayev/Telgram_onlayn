const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
chai.use(chaiHttp);
const should = chai.should()


describe(`Test GET method chat page`, () => {
    it(`Sahifa testdan o'tdi`, (done) => {
        chai.request(server)
            .get('/chat')
            .end((err, res) => {
                res.should.have.status(200)
                done()

            })
    })
})

