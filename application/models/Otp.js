var otpSchema = new mongooseSchema({
    firstName:{
        type:String,
        trim: true
    },
    lastName:{
        type:String,
        trim: true
    },
    mobile:{
        type:String,
        trim: true
    },
    email:{
        type:String,
        trim: true
    },
    otp: {
        type: Number,
        required: true 
    },
    role:{
        type: String,
        trim: true
    },
    isNewUser:{
        type:Boolean,
        default:false
    }
});

var Otp = mongoose.model('otp', otpSchema);
module.exports = Otp
