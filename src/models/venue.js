import { Schema, model, SchemaTypes} from "mongoose";

const venuSchema = new Schema({
    title: String,
    desc: String,
    amenities: [{type: String}],
    price: {
        cost: Number,
        per: String
    },
    reviews: [{
        content: String,
        author: String,
        date: Date,
        rating: {
            type: Number,
            min: 1,
            max: 5
        }
    }],
    picsURLs: [{type:String}],
    formURL: String,
    iconURLs: [{type: String}],
    mapsURL: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});

const Venue = model('venue', venuSchema);

export default Venue;