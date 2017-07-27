var UserSchema = new mongooseSchema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    mobile:{
        type:String
    },
    email:{
        type:String
    },
    role:{
        type:String
    },
    hubspotUserId:{
        type:String
    }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;