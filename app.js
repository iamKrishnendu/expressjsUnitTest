var express = require("express");
var app = express();
var parser = require("body-parser");
var posts = require('./db/post_db');

app.use(parser.json());
app.use(parser.urlencoded({extended:false}));


    app.get('/api/v1/allposts',(req,res,next)=>{
        res.status(200).send({
            success:'true',
            message:'all posts retrieved successfully',
            allposts:posts
        })
    });
    
    app.post('/api/v1/create/post',(req,res,next)=>{
        
        if(!req.body.topic){
            res.status(400).send({
                success:'false',
                message:"topic must be provided",
            })
        }else if(!req.body.description){
            res.status(400).send({
                success:'false',
                message:'description must be provided'
            })
        }else if(!req.body.author){
            res.status(400).send({
                success:'false',
                message:'author must be provided'
            })
        }
    
        var NewPost=
            {
                id: posts.length +1,
                topic: req.body.topic,
                description: req.body.description,
                author : req.body.author
            }
        
    
        posts.push(NewPost);
    
        return res.status(201).send({
            success:'true',
            message:'A new post has been created'
        })
    })
    
    app.delete('/api/v1/posts/:id',(req,res)=>{
        const id = parseInt(req.params.id,10);
    
        posts.map((allposts,index)=>{
            if(allposts.id===id){
                posts.splice(index,1);
                return res.status(200).send({
                    success:'true',
                    message:"Post deleted successfully"
                });
            }
        })
    
        return res.status(404).send({
            success:'false',
            message:'No posts found to delete'
        });
    })


app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})

module.exports=app