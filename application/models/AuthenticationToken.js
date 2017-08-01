var AuthenticationTokenSchema = new mongooseSchema({
    auth_token: {
        type: String,
        default: '',
        required: true,
        trim: true,
        validate: [stringNotNull, 'Authentocation token required']
    },
    mobile: {
        type: String
    },
    role: {
        type: String
    }
});

function stringNotNull(obj) {
    return obj.length;
}

var AuthenticationToken = mongoose.model('AuthenticationToken', AuthenticationTokenSchema);
module.exports = AuthenticationToken;