var ClientAdvisorSchema = new mongooseSchema({
    
    client:{
        CONTACT_ID:{ type: Number, unique : true, required: true },
        FIRST_NAME: { type: String, trim: true },
        LAST_NAME: { type: String, trim: true }
    },
    advisor:{
        CONTACT_ID:{ type: Number, unique : true, required: true },
        FIRST_NAME: { type: String, trim: true },
        LAST_NAME: { type: String, trim: true }
    }
});


function stringNotNull(obj) {
    return obj.length
}



var ClientAdvisor = mongoose.model('ClientAdvisor', ClientAdvisorSchema);
module.exports = ClientAdvisor
