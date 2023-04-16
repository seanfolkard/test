import Register from "../models/register.js";
import User from "../models/user.js";
import Venue from "../models/venue.js";

const registerController = {
    postRegister: function(req, res) {
        console.log(req.body);
        Register.create(req.body);
    },
    fillvenue: function (req, res) {
        Venue.findById(req.query.venue).then(result => {
            const title = result['title'];
            User.findOne({_id: req.query.user}).lean().exec()
                .then(result => {
                    if (result == null) {
                        res.render('index', {
                            title: 'Home Page'
                        });
                    } else {
                        result.date = new Date;
                        result.venue = req.query.venue;
                        result.vtitle = title;
                        result.title = 'Register';
                        const date = new Date(result.birthday).toISOString().split('T')[0];
                        result.dob = date;
                        res.render('register', result);
                    }
                }
            );
        })
    },
    getRegister: function (req, res) {
        Register.find({email:req.query.email}).lean().exec()
            .then(async result => {
                if (result == null) {
                    res.send('')
                } else {
                    for (let index = 0; index < result.length; index++) {
                        const element = result[index];
                        element.dateofregis = element.dateofregis.toISOString().split('T')[0];
                        let venue = await Venue.findOne({_id:element.vid}).lean().exec();
                        element.title = venue.title
                    }
                    res.send(result);
                }
            })
    }
}

export default registerController;