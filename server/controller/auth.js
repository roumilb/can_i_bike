const crypto = require('crypto');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
};

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
};

const userClass = require('../class/user');

const authTokens = {};

class Auth
{
    static async register(req, res, next) {
        let userRequest = req.body.user;

        let user = await userClass.getOneByEmail(userRequest.email);
        if (user) res.send({error: 'USER_EXISTS'});

        // Check if the password and confirm password fields match
        if (userRequest.password === userRequest.passwordConfirm) {

            const hashedPassword = getHashedPassword(userRequest.password);

            let userToSave = {
                email: userRequest.email,
                password: hashedPassword,
                city: userRequest.city,
                places: {
                    'Home': {},
                    'Work': {},
                },
            };

            // Store user into the database if you are using one
            let userSaved = await userClass.create(userToSave);
            if (!userSaved) res.send({error: 'REGISTER_ERROR'});

            const authToken = generateAuthToken();
            // Store authentication token
            authTokens[authToken] = userSaved._id;
            // Setting the auth token in cookies
            res.cookie('AuthToken', authToken);
            // Redirect user to the protected page
            res.json({token: authToken});
        } else {
            res.send({message: 'error register'});
        }
    }

    static async login(req, res, next) {
        const {email, password} = req.body;
        const hashedPassword = getHashedPassword(password);

        let user = await userClass.getUserLogin(email, hashedPassword);

        if (user) {
            const authToken = generateAuthToken();

            // Store authentication token
            authTokens[authToken] = user;

            // Setting the auth token in cookies
            res.cookie('AuthToken', authToken);

            // Redirect user to the protected page
            res.json({token: authToken});
        } else {
            res.send({error: 'LOGIN_ERROR'});
        }
    }

    static async user(req, res, next) {
        if (!req.user) {
            res.send({user: ''});
            return true;
        } else {
            let user = await userClass.getOneById(req.user);
            res.send({user: user});
            return true;
        }
    }

    static getAuthToken(authToken) {
        return authTokens[authToken];
    }

    static logout(req, res, next) {
        delete authTokens[req.user];
        res.send({message: 'logout'});
    }

    static async addPlace(req, res, next) {
        if (!req.user) {
            res.send({});
            return;
        }
        const {email, place} = req.body;
        let user = await userClass.addPlaceByEmail(email, place);

        res.json({user: user});
    }

    static async addStation(req, res, next) {
        if (!req.user) {
            res.send({});
            return;
        }
        const {email, place, station} = req.body;
        let user = await userClass.addStation(email, place, station);
        res.send({user: user});
    }

    static async deletePlace(req, res, next) {
        if (!req.user) {
            res.send({});
            return;
        }
        const {email, place} = req.body;
        let user = await userClass.deletePlace(email, place);

        res.send({user: user});
    }

    static async deleteStation(req, res, next) {
        if (!req.user) {
            res.send({});
            return;
        }
        const {email, place, station} = req.body;
        let user = await userClass.deleteStation(email, place, station);
        res.send({user: user});
    }
}

module.exports = Auth;