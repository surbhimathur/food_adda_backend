const mongoose=require("mongoose");


module.exports=()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };
    try{
        mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0vw0p.mongodb.net/?retryWrites=true&w=majority`,connectionParams);
        console.log("connected to db successfully");
    }
    catch(error){
        console.log(error);
        console.log("could not connect to db!");
    }
};