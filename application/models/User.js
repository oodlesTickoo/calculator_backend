var UserSchema = new mongooseSchema({
   CONTACT_ID:{ type: Number, unique : true, required: true },
    SALUTATION: { type: String, trim: true },
    FIRST_NAME: { type: String, trim: true },
    LAST_NAME: { type: String, trim: true, trim: true },
    BACKGROUND: { type: String, trim: true },
    IMAGE_URL: { type: String, trim: true },
    DEFAULT_LINKED_ORGANISATION: { type: String, trim: true },
    OWNER_USER_ID: { type: Number },
    DATE_CREATED_UTC: { type: Date },
    DATE_UPDATED_UTC: { type: Date },
    VISIBLE_TO: { type: String, trim: true },
    VISIBLE_TEAM_ID: { type: Number },
    VISIBLE_USER_IDS: { type: String, trim: true },
    CUSTOMFIELDS : [
        {
            CUSTOM_FIELD_ID: { type: String, trim: true },
            FIELD_VALUE: { type: String, trim: true }
        }
    ],
    ADDRESSES: [
        {
            ADDRESS_ID: { type: Number },
            ADDRESS_TYPE: { type: String, trim: true },
            STREET: { type: String, trim: true },
            CITY: { type: String, trim: true },
            STATE: { type: String, trim: true },
            POSTCODE: { type: String, trim: true },
            COUNTRY: { type: String, trim: true }
        }
    ],
    CONTACTINFOS: [{
        CONTACT_INFO_ID: { type: Number },
        TYPE: { type: String },
        SUBTYPE: { type: String },
        LABEL: { type: String },
        DETAIL: { type: String }
    }],
    DATES: [{
        DATE_ID: { type: Number },
        OCCASION_NAME: { type: String },
        OCCASION_DATE: { type: Date },
        REPEAT_YEARLY: { type: Boolean },
        CREATE_TASK_YEARLY: { type: Boolean }
    }],
    TAGS: [{
        TAG_NAME: { type: String }
    }],
    LINKS: [{
        LINK_ID: { type: Number },
        CONTACT_ID: { type: Number },
        OPPORTUNITY_ID: { type: Number },
        ORGANISATION_ID: { type: Number },
        PROJECT_ID: { type: Number },
        SECOND_PROJECT_ID: { type: Number },
        SECOND_OPPORTUNITY_ID: { type: Number },
        ROLE: { type: String },
        DETAILS: { type: String }
    }],
    CONTACTLINKS: [{
        CONTACT_LINK_ID: { type: Number },
        FIRST_CONTACT_ID: { type: Number },
        SECOND_CONTACT_ID: { type: Number },
        RELATIONSHIP_ID: { type: Number },
        DETAILS: { type: String }
    }],
    EMAILLINKS: [{
        EMAIL_LINK_ID: { type: Number },
        EMAIL_ID: { type: Number },
        CONTACT_ID: { type: Number },
        ORGANISATION_ID: { type: Number },
        OPPORTUNITY_ID: { type: Number },
        PROJECT_ID: { type: Number },
        LEAD_ID: { type: Number }
    }]
});


function stringNotNull(obj) {
    return obj.length
}

var User = mongoose.model('User', UserSchema);
module.exports = User
