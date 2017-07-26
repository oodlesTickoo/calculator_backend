var AuthenticationTokenSchema = new mongooseSchema({
    auth_token: {
        type: String,
        default: '',
        required: true,
        trim: true,
        validate: [stringNotNull, 'Authentocation token required']
    },
    user:{
        type: mongooseSchema.ObjectId,
        ref: 'user'
    }
});

function stringNotNull(obj) {
    return obj.length
}

var AuthenticationToken = mongoose.model('AuthenticationToken', AuthenticationTokenSchema);
module.exports = AuthenticationToken
