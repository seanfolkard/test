import User from "../models/user.js";

const usersController = {
    /**
     * Expects email and password
     * Usage:
     * fetch(`/api/auth?email=${email_var}&password=${password_var}`) // async use .then()
     */
    authenticateUser: function(req, res) {
        const email = req.query.email;
        const pass = req.query.password;
        User.findOne({email:email, password:pass}).lean().exec().then(result => {
            if (result == null) {
                res.json('');
            } else {
                res.json(result);
            }
        });
    },

    checkEmail: function(req, res) {
        const email = req.query.email;
        User.findOne({email:email}).lean().exec().then(result => {
            if (result == null) {
                res.json('');
            } else {
                res.json(result);
            }
        });
    },

    /**
     * Creates new user in database
     */
    postUser: function(req, res) {
        User.create(req.body);
    },

    /**
     * TODO: Update User
     */
    updateUser: function(req, res) {
        User.updateOne({email:req.body.email}, req.body).lean().exec();
    }
}

export default usersController;