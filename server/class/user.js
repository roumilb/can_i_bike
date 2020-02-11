const UserModel = require('../model/user');

class User
{
    static async getOneByEmail(email) {
        let user = await UserModel.findOne({email: email});
        if (!user) return null;
        user.places = JSON.parse(user.places);
        return user;
    }

    static async getOneById(id) {
        let user = await UserModel.findById(id);
        if (!user) return null;
        return this.getFormatedUser(user);
    }

    static async create(user) {
        let userFormatted = new UserModel;
        userFormatted.email = user.email;
        userFormatted.password = user.password;
        userFormatted.city = user.city;
        userFormatted.places = JSON.stringify(user.places);
        return await UserModel.create(userFormatted);
    }

    static async getUserLogin(email, password) {
        return await UserModel.findOne({
            email: email,
            password: password,
        });
    }

    static async addPlaceByEmail(email, placeName) {
        let user = await this.getOneByEmail(email);
        user = this.getFormatedUser(user);
        user.places[placeName] = {};
        user.places = JSON.stringify(user.places);
        let updated = await UserModel.updateOne({email: user.email}, {places: user.places});
        if (updated.ok) {
            return this.getFormatedUser(user);
        } else {
            return false;
        }
    }

    static async deletePlace(email, placeName) {
        let user = await this.getOneByEmail(email);
        user = this.getFormatedUser(user);
        delete user.places[placeName];
        user.places = JSON.stringify(user.places);
        let updated = await UserModel.updateOne({email: user.email}, {places: user.places});
        if (updated.ok) {
            return this.getFormatedUser(user);
        } else {
            return false;
        }
    }

    static async addStation(email, place, station) {
        let user = await this.getOneByEmail(email);
        user = this.getFormatedUser(user);
        user.places[place][station.id] = station.name;
        user.places = JSON.stringify(user.places);
        let updated = await UserModel.updateOne({email: user.email}, {places: user.places});
        if (updated.ok) {
            return this.getFormatedUser(user);
        } else {
            return false;
        }
    }

    static async deleteStation(email, place, station) {
        let user = await this.getOneByEmail(email);
        user = this.getFormatedUser(user);
        delete user.places[place][station];
        user.places = JSON.stringify(user.places);
        let updated = await UserModel.updateOne({email: user.email}, {places: user.places});
        if (updated.ok) {
            return this.getFormatedUser(user);
        } else {
            return false;
        }
    }

    static async removeAll() {
        return await UserModel.deleteMany({});
    }

    static getFormatedUser(user) {
        return {
            _id: user.id,
            email: user.email,
            password: user.password,
            city: user.city,
            places: JSON.parse(user.places),
        };
    }
}

module.exports = User;