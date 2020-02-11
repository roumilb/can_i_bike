const axios = require('axios');
const baseUrl = 'http://api.citybik.es/v2/networks';

class pyBikes
{
    //get all cities
    static async getAllCities(req, res, next) {
        axios.get(baseUrl)
             .then((response) => {
                 res.send(response.data.networks);
             });
    }

    //get all stations of a city
    static async getAllStations(req, res, next) {
        axios.get(`${baseUrl}/${req.params.city}`)
             .then((response) => {
                 res.send(response.data.network.stations);
             });
    }
}

module.exports = pyBikes;