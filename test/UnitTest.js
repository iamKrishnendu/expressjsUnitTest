var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = require('../app')
var expect = require('chai').expect;
var posts = require('../db/post_db');

describe('Mock API Unit Test Suite', function(){

    it.only('API status code should return 200 for GET call', function(done){
           chai.request(app)
               .get('/api/v1/allposts').end((err,res)=>{
                   if(err) done(err);
                   expect(res).to.have.status(200);
                   console.log(JSON.stringify(res.body,"",2));
                   done();
               }) 
            })

     it.only('API status code should return 201 for POST call', function(done){
           chai.request(app)
                 .post('/api/v1/create/post')
                 .send({
                       
                       "topic":"Express JS",
                       "description":"Basic API creation with Express js",
                       "author":"Online blog"
                 }).end((err,res)=>{
                    if(err) done(err);
                    expect(res).to.have.status(201);
                    console.log(JSON.stringify(res,"",2));
                    done();
                 })
                 
         })

         it.only('Total post count should increase after post call', function(done){
            chai.request(app)
            .get('/api/v1/allposts').end((err,res)=>{
                if(err) done(err);
                expect(res).to.have.status(200);
                console.log(res.body.allposts.length)
                expect(res.body.allposts).to.have.lengthOf(3)
                done();
            }) 
         })

         it('API status code should return 400 for POST call with Missing field', function(done){
            chai.request(app)
                  .post('/api/v1/create/post')
                  .send({
                        
                        "description":"Basic API creation with Express js",
                        "author":"Online blog"
                  }).end((err,res)=>{
                     if(err) done(err);
                     expect(res).to.have.status(400);
                     console.log(JSON.stringify(res,"",2));
                     done();
                  })
                  
          })

          it.only('API status code is 200 for DELETE request', function(done){
            chai.request(app)
                 .del('/api/v1/posts/3')
                 .end((err,res)=>{
                     if(err) done(err);
                     expect(res).to.have.status(200);
                     console.log(JSON.stringify(res,"",2));
                     done();
                 })
                  
          })
})