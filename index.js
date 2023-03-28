const express=require("express");
const jwt=require("jsonwebtoken");
const app=express();
const secretkey="secretkey";
app.get("/",(req,res)=>
{
    res.json({
        message:"a sample api"
    })
})
 app.post("/login",(req,resp)=>
 {
    const user=
    {
    id:1,
    username:'amit',
    email:'abc@test.com'

    }
    jwt.sign({user},secretkey,{expiresIn:'300s'},(err,token)=>
    {
        resp.json({
            token
        })
    })

 })
 app.post('/profile',verifyToken,(req,resp)=>
 {
    jwt.verify(req.token,secretkey,(err,authData)=>
    {
        if(err)
        {
            resp.send({
                result:"invalid token"
            })
        }
        else
        {
            resp.json({
                message:"Profile accessed",
                authData
            })
        }
    })
 })

 function verifyToken(req,resp,next)
 {
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !=='undefined')
    {
     const bearer=bearerHeader.split(" ");
     const token=bearer[1];
     req.token=token;
     next();
    }else
    {
        resp.send(
            {
                result:'Token is not valid',
            }
        )
    }
 }
 
app.listen(5000,()=>
{
    console.log("app is running port 5000");
})










9