const mongoose=require('mongoose')

const topost=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const structure=mongoose.model('data',topost)

module.exports=structure