var UserSchema = new mongooseSchema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mobile: {
        type: String, unique: true
    },
    email: {
        type: String
    },
    role: {
        type: String
    },
    hubspotUserId: {
        type: String
    },
    advisor: {
        type: mongooseSchema.ObjectId,
        ref: 'User'
    }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;