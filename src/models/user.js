import { Schema, model, SchemaTypes} from "mongoose";

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    number: Number,
    birthday: Date,
    gender: {
        type: String,
        enum: ['male', 'female', 'null'],
        default: 'pns'
    },
    password: String
});

const User = model('user', userSchema);

export default User;