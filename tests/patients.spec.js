process.env.NODE_ENV = "test";
const User = require('../models/Patient');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp);
let patientID;
describe('/GET patient', () => {
    it('it should Get all patients', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('/POST patient', () => {
    it('it sould post the patient info', (done) => {
        const patient = {
            firstname: "Rad",
            lastname: "Rouached",
            birthday: "1991-06-02"
        };
        chai.request(app)
            .post('/api/patient')
            .send(patient)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('firstname');
                res.body.should.have.property('lastname');
                res.body.should.have.property('birthday');
                patientID = res.body._id;
                console.log(patientID);
                done();
            });
    });
});

describe('/Get patient', () => {
// Test to get single patient record
    it("should get a single patient record", (done) => {
        const id = patientID;
        chai.request(app)
            .get(`/api/patient/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});
// Test to get single patient record

describe('/Get patient', () => {
    it("should not get a single patient record", (done) => {
        const id = 1;
        console.log(id);
        chai.request(app)
            .get(`/api/patients/${id}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

});

describe('edit/:id patient', () => {
    it("should update the patient info", (done) => {
        const patient = {
            firstname: "Rad",
            lastname: "Reichman",
            birthday: "1991-12-03"
        };
        const id = patientID;
        chai.request(app)
            .put('/api/patient/' + id)
            .send(patient)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('firstname');
                res.body.should.have.property('lastname');
                res.body.should.have.property('birthday');
                done();
            });
    });
});

describe('delete/:id patient', () => {
    it("should delete the patient info", (done) => {
        const id = patientID;
        chai.request(app)
            .del('/api/patient/' + id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
