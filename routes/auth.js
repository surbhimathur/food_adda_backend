const router= require("express").Router();
const {User}=require("../models/user");
 const Joi=require("joi");
 const bcrypt= require("bcrypt");


router.post("/",async(req,res)=>{
    try {
        const {error}=validate(req.body);

        if(error)
        return res.status(400).send({message:error.details[0].message});

        const user= await User.findOne({email:req.body.email});
        console.log(user);
        if(!user)
        return res.status(401).send({message:"Invalid email"});

        const validPassword= await bcrypt.compare(
            req.body.password,user.password
        );                                                 //comparing passwords(plain text what user enter in sign in form(changes it to hashed password) with hashed password in db)

        if(!validPassword)
     return res.status(401).send({message:"Invalid email or password"});
     console.log(validPassword);
   
          const token= await user.generateAuthToken();
   
      console.log(token);
      res.status(200).send({token,firstName:user.firstName,message:"Logged in successfully"});

    } catch (error) {
        res.status(500).send({error,message:"Internal server error"});
        
    }
})


const validate=(data)=>{
    const schema= Joi.object({
        email:Joi.string().email().required().label("Email"),
        password:Joi.string().required().label("Password")
    });
    return schema.validate(data);
}
module.exports=router;