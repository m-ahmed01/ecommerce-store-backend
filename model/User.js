
const mongoose = require('mongoose');

const {Schema} = mongoose;


const userSchema = new Schema({
    // email:{type: String, required: true, unique:true},
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                // Define a regular expression to match a valid email address
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password:{type: Buffer, required: true},
    role:{type: String, required: true, default:'user'},
    addresses:{type: [Schema.Types.Mixed]},
    name:{type: String},
    // orders:{type: [Schema.Types.Mixed]},
    salt: Buffer
});

const virtual = userSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function(doc,ret){delete ret._id}
})

exports.User = mongoose.model("User", userSchema);  // exporting model->productSchema