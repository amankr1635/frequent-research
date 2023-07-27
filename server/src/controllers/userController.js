const userModel = require("../models/userSchema");
const countryModel = require("../models/countrySchema");
const stateModel = require("../models/stateSchema");
const cityModel = require("../models/citySchema");

const mongoose = require("mongoose");
const {isValidName,isValidEmail,isValidDate} = require("../validation/validation");

const createUser = async function (req,res){
try {
        let body = req.body
        let keys = Object.keys(body);
        let dataArr = [
          "firstName",
          "lastName",
          "email",
          "country",
          "state",
          "city",
          "gender",
          "dateOfBirth",
        ];
        for (let i of dataArr) {
          if (!keys.includes(i))
            return res
              .status(400)
              .send({ status: false, message: `${i} field is mandatory ` });
        }
        body.firstName = body.firstName.trim()
        if(body.firstName == ""){
            return res.status(400).send({status:false, message:"firstName cannot be empty"})
        }
        if(!isValidName(body.firstName)){
            return res.status(400).send({status:false, message:"Please enter firstName in Alphabates"})
        }
        body.lastName = body.lastName.trim()
        if(body.lastName == ""){
            return res.status(400).send({status:false, message:"lastName cannot be empty"})
        }
        if(!isValidName(body.lastName)){
            return res.status(400).send({status:false, message:"Please enter lastName in Alphabates"})
        }
        body.email = body.email.trim()
        if(body.email == ""){
            return res.status(400).send({status:false, message:"email cannot be empty"})
        }
        if(!isValidEmail(body.email)){
            return res.status(400).send({status:false, message:"Please enter a Valid email"})
        }
        body.country = body.country.trim()
        if(body.country == ""){
            return res.status(400).send({status:false, message:"country cannot be empty"})
        }
        if (!mongoose.Types.ObjectId.isValid(body.country)){
            return res
            .status(400)
            .send({ status: false, message: "Invalid country ID" });
        }
        body.state = body.state.trim()
        if(body.state == ""){
            return res.status(400).send({status:false, message:"state cannot be empty"})
        }
        if (!mongoose.Types.ObjectId.isValid(body.state)){
            return res
            .status(400)
            .send({ status: false, message: "Invalid state ID" });
        }
        body.city = body.city.trim()
        if(body.city == ""){
            return res.status(400).send({status:false, message:"city cannot be empty"})
        }
        if (!mongoose.Types.ObjectId.isValid(body.city)){
            return res
            .status(400)
            .send({ status: false, message: "Invalid city ID" });
        }
        if(body.gender !== "Male"&& body.gender!=="Female"&& body.gender !== "Other"){
            return res.status(400).send({status:false, message:"you can put only 'Male', 'Female' or 'Other'"})
        }
        body.dateOfBirth = body.dateOfBirth.trim()
        if(body.dateOfBirth == ""){
            return res.status(400).send({status:false, message:"dateOfBirth cannot be empty"})
        }
        if(!isValidDate(body.dateOfBirth)){
            return res.status(400).send({status:false, message:"DOB is not valid use Fromat YYYY-MM-DD"})
        }
        const create = userModel.create(body)
        return res.status(201).send({status:false, message:"User Created Sucessfully", data:create})
    
} catch (error) {
    return res.status(500).send({status:false , message:error.message})
}
}

let getAllUser = async function(req,res){
    try {
        let {userId} = req.query
        if(userId){
            let getDocunment = await userModel.findOne({_id:userId}).populate('country state city')
            if(!getDocunment){
                return res.status(404).send({status:false, message:"No Documents Found"})
            }
            const response = {
                _id: getDocunment._id,
                firstName: getDocunment.firstName,
                lastName: getDocunment.lastName,
                email: getDocunment.email,
                gender: getDocunment.gender,
                dateOfBirth: getDocunment.dateOfBirth,
                country: getDocunment.country.name,
                state: getDocunment.state.name, 
                city: getDocunment.city.name, 
                dateOfBirth:getDocunment.dateOfBirth.toLocaleDateString(),
            };
            return res.status(200).send({status:true, message:"User Details", data:response})
        }
        else{
            let allUsers = await userModel.find()
            if(allUsers.length==0){
                return res.status(400).send({status:false, message:"No User Details Found"})
            }
            return res.status(200).send({status:true,message:"All Users Details", data:allUsers})
        }
    } catch (error) {
        return res.status(500).send({status:false, message:error.message})
    }
    }
    

const createCountry = async function(req,res){
try {
        let body = req.body
        if(Object.keys(body).length==0){
            return res.status(400).send({status:false, message:"Please enter form"})
        }
        if(!body.name){
            return res.status(400).send({status:false, message:"please enter name"})
        }
        body.name = body.name.trim()
        if(body.name == ""){
            return res.status({status:false, message:"name cannot be empty"})
        }
        let create =  await countryModel.create(body)
        return res.status(201).send({status:true, message:"Country Created Sucessfully", data:create})
    
} catch (error) {
    return res.status(500).send({status:false, message:error.message})
}
}

const createState = async function(req,res){
  try {
      let body = req.body
      if(Object.keys(body).length==0){
          return res.status(400).send({status:false, message:"form cannot be empty"})
      }
      if(!body.name){
          return res.status(400).send({status:false, message:"please enter name"})
      }
      body.name = body.name.trim()
      if(body.name==""){
          return res.status(400).send({status:false, message:"name cannot be empty"})
      }
      if(!body.country){
          return res.status(400).send({status:false, message:"please enter country"})
      }
      body.country = body.country.trim()
      if(body.country==""){
          return res.status(400).send({status:false, message:"country cannot be empty"})
      }
      if (!mongoose.Types.ObjectId.isValid(body.country)){
          return res.status(400).send({ status: false, message: "Invalid country ID" });
      }
      let countryCheck = await countryModel.findOne({_id:body.country})   
      if(!countryCheck){
          return res.status(404).send({status:false, message:"country does not found"})
      }
      let create = await stateModel.create(body)
      return res.status(201).send({status:false, message:"State created sucessfully", data :create})
      
  } catch (error) {
    return res.status(500).send({status:false, message:error.message})
  }
}


const createCity = async function(req,res){
    try {
        let body = req.body
        if(Object.keys(body).length==0){
            return res.status(400).send({status:false, message:"form cannot be empty"})
        }
        if(!body.name){
            return res.status(400).send({status:false, message:"please enter name"})
        }
        body.name = body.name.trim()
        if(body.name==""){
            return res.status(400).send({status:false, message:"name cannot be empty"})
        }
        if(!body.state){
            return res.status(400).send({status:false, message:"please enter state"})
        }
        body.state = body.state.trim()
        if(body.state==""){
            return res.status(400).send({status:false, message:"State cannot be empty"})
        }
        if (!mongoose.Types.ObjectId.isValid(body.state)){
            return res.status(400).send({ status: false, message: "Invalid state ID" });
        }
        let stateCheck = await stateModel.findOne({_id:body.state})   
        if(!stateCheck){
            return res.status(404).send({status:false, message:"state does not found"})
        }
        let create = await cityModel.create(body)
        return res.status(201).send({status:false, message:"City created sucessfully", data :create})
        
    } catch (error) {
      return res.status(500).send({status:false, message:error.message})
    }

}
const getCountry = async function(req,res){
try {
        let allCountries = await countryModel.find()
        return res.status(200).send({status:true, message:"All Contries",data:allCountries})
    
} catch (error) {
    return res.status(500).send({status:false, message:error.message})
}
}

const getState = async function(req,res){
try {
        let params = req.params

        if(!params.country){
            return res.status(400).send({status:false, message:"please enter country"})
        }
        let stateCheck = await stateModel.find({country:params.country})
        if(stateCheck.length==0){
            return res.status(404).send({status:false, message:"state doesnot found"})
        }
        return res.status(200).send({status:true, data:stateCheck})
} catch (error) {
    return res.status(500).send({status:false, message:error.message})
}
}

const getCity = async function(req,res){
try {
        let params = req.params
        if(!params.state){
            return res.status(400).send({status:false, message:"please enter state"})
        }
        let cityCheck = await cityModel.find({state:params.state})
        if(cityCheck.length==0){
            return res.status(404).send({status:false, message:"city doesnot found"})
        }
        return res.status(200).send({status:true, data:cityCheck})
} catch (error) {
    return res.status(500).send({status:false, message:error.message})
}
}


module.exports ={createUser,getAllUser,createCountry,createState,getCountry,createCity,getState,getCity}