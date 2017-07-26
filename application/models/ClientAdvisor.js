var ClientAdvisorSchema = new mongooseSchema({
    client:{
        CONTACT_ID:{ type: Number, required: true },
        FIRST_NAME: { type: String, trim: true },
        LAST_NAME: { type: String, trim: true }
    },
    advisor:{
        CONTACT_ID:{ type: Number,required: true },
        FIRST_NAME: { type: String, trim: true },
        LAST_NAME: { type: String, trim: true }
    }
});

var ClientAdvisor = mongoose.model('ClientAdvisor', ClientAdvisorSchema);
module.exports = ClientAdvisor
