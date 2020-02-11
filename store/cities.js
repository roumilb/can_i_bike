const axios = require('axios');
const baseUrl = 'http://localhost:3000';

export const state = () => ({
    cities: 0,
});

export const actions = {
    async setCities({commit}) {
        await axios.get(`${baseUrl}/api/cities`)
                   .then(response => {
                       let cities = response.data.map(function (city) {
                           let name = `${city.location.city} - ${city.name}`;
                           return {
                               'value': city.id,
                               'text': name,
                           };
                       });
                       commit('set', cities);
                   });
    },
};

export const mutations = {
    set(state, data) {
        state.cities = data;
    },
};

export const getters = {
    getCities: state => {
        return state.cities;
    },
};