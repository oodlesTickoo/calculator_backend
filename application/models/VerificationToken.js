var VerificationTokenSchema = new mongooseSchema({
    verificationToken: {
        type: String,
        default: '',
        required: true,
        trim: true,
        validate: [stringNotNull, 'Verification token required']
    },
    email: {
        type: String,
        default: '',
        required: true,
        trim: true,
        validate: [stringNotNull, 'Email required']
    },
    user: {
        type: mongooseSchema.ObjectId,
        ref: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});


function stringNotNull(obj) {
    return obj.length
}



var VerificationToken = mongoose.model('VerificationToken', VerificationTokenSchema);
module.exports = VerificationToken
