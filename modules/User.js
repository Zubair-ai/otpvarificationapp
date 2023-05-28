import mongoose from "mongoose";
const OtpUserScheema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
},{
    timestamps:true
}
);

export default mongoose.model("OtpUser",OtpUserScheema);