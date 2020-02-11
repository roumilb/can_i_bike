const axios = require('axios');
const baseUrl = 'http://localhost:3000';

export const state = () => ({
    user: {},
});

export const actions = {
    async setPlaceUser({commit}, place) {
        await this.$axios.post('/api/user/place', {
            email: this.$auth.user.email,
            place: place,
        })
                  .then(res => {
                      commit('set', res.data.user);
                  });
    },
    async setStationUser({commit}, {place, station}) {
        await this.$axios.post('/api/user/place/station', {
            email: this.$auth.user.email,
            place: place,
            station: station,
        })
                  .then(res => {
                      commit('set', res.data.user);
                  });
    },
    async deletePlace({commit}, place) {
        await this.$axios.post('/api/user/place/delete', {
            email: this.$auth.user.email,
            place: place,
        })
                  .then(res => {
                      commit('set', res.data.user);
                  });
    },
    async deleteStation({commit}, {place, station}) {
        await this.$axios.post('/api/user/place/station/delete', {
            email: this.$auth.user.email,
            place: place,
            station: station,
        })
                  .then(res => {
                      commit('set', res.data.user);
                  });
    },
    setUser({commit}) {
        commit('set', this.$auth.user);
    },
};

export const mutations = {
    set(state, user) {
        state.user = user;
    },
};

export const getters = {
    getUser: state => {
        return state.user;
    },
};