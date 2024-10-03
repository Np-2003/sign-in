const express =require('express')
const app=express()
const mongoose=require('mongoose')
const path =require('path')
const structure=require('./schema')

app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'))
})

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'signup.html'))
})

mongoose.connect('mongodb://localhost:27017/signup&login')
.then(()=>console.log('Connected Db'))
.catch(()=> console.log('error connecting ...'))

app.post('/submit',async(req,res)=>{
    try{
        const newuser= new structure({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        await newuser.save()
        res.send('form data saved successfully')
    }catch(error){
        console.log(error)
    }
})

app.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body
        const useremail=await structure.findOne({email})

        if(!useremail || useremail.password !== password){
            return res.status(401).send('invalid Email Or Password')
        }
        res.send('Login Succefully')
    }
    catch(error){
        console.log('error during login',error)
        res.status(500).send('Error while Login')
    }
})

app.listen(3000,()=>{
    console.log('server is running on the port')
})