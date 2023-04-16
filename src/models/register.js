import { Schema, model, SchemaTypes} from "mongoose";

const registerSchema = new Schema({
    firstname: String,
    lastname: String,
    dateofregis: Date,
    numpeople: Number,
    email: String,
    number: Number,
    birthday: Date,
    uid: String,
    vid: String,
    approved: {
        type: Boolean,
        default: false
    }
});

const Register = model('register', registerSchema);

export default Register;
