var UserSchema = new mongooseSchema({
    firstName: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    email: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    password: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    salt: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    accountLocked: {
        type: Boolean,
        default: true,
        required: true,
        trim: true
    },
    isAccountActive: {
        type: Boolean,
        default: false,
        required: true,
        trim: true
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

//configuring different access level for the USER
UserSchema.plugin(require('mongoose-role'), {
    roles: configurationHolder.config.roles,
    accessLevels: configurationHolder.config.accessLevels
});

function stringNotNull(obj) {
    return obj.length
}

var User = mongoose.model('User', UserSchema);
module.exports = User
