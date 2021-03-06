var AuthenticationTokenSchema = new mongooseSchema({
    auth_token: {
        type: String,
        default: '',
        required: true,
        trim: true,
        validate: [stringNotNull, 'Authentocation token required']
    },
    contact_id:{ 
        type: Number,
        required: true 
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: String,
        required: true,
        trim: true
    }
});


function stringNotNull(obj) {
    return obj.length
}



var AuthenticationToken = mongoose.model('AuthenticationToken', AuthenticationTokenSchema);
module.exports = AuthenticationToken
