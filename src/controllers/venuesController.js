import Venue from "../models/venue.js";

const venuesController = {
    getAll: function(req, res) {
        Venue.find({}).lean().exec().then(results => {
            const venues = results;
            for (let index = 0; index < results.length; index++) {
                const element = results[index];
                element['ratingInt'] = [];
                element['noStar'] = [];
                const ratingInt = Math.floor(element['rating']);
                for (let index = 1; index <= 5; index++) {
                    if (index <= ratingInt) {
                        element['ratingInt'].push({});
                    } else {
                        element['noStar'].push({});
                    }
                }
                const reviews = element['reviews'];
                const currYear = new Date().getFullYear();
                for (let index = 0; index < reviews.length; index++) {
                    const review = reviews[index];
                    const revYear = new Date(review['date']).getFullYear();
                    const newYear = currYear - revYear;
                    if (newYear == 0) {
                        review['date'] = 'this year'
                    } else if (newYear == 1) {
                        review['date'] = 'a year ago'
                    } else {
                        review['date'] = newYear + ' years ago'
                    }
                }
            }
            res.render('partials/venue', {
                venues: venues,
                layout: false
            });
        });
    },

    fillUp: function(req, res) {
        Venue.findOne({_id: req.query._id}).lean().exec()
            .then(result => {
                if (result == null) {
                    res.render('register', {
                        title: 'Register'
                    })
                }
            });
    }
};

export default venuesController