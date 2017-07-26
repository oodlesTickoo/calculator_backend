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
    factFindId:{
        type: mongooseSchema.ObjectId,
        ref: 'factFind'
    }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;