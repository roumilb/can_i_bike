export const state = () => ({
    stations: 0,
});

export const actions = {
    async setStations({commit}, city) {
        await this.$axios.get(`/api/cities/${city}`)
                  .then(response => {
                      let stations = response.data.map(function (station) {
                          let address = station.name;
                          if (station.extra !== undefined && station.extra.address !== undefined && station.extra.address !== '') {
                              address += ` (${station.extra.address})`;
                          }
                          return {
                              id: station.id,
                              name: station.name,
                              address: address,
                              bikes: station.free_bikes,
                              stands: station.empty_slots,
                          };
                      });
                      commit('set', stations);
                  });
    },
};

export const mutations = {
    set(state, data) {
        state.stations = data;
    },
};

export const getters = {
    getStations: state => {
        return state.stations;
    },
    getStationsForSelect: state => {
        return state.stations.map(station => {
            return {
                value: station.id,
                text: station.name,
            };
        });
    },
    getStationsForPlaces: state => {
        let stationsForPlaces = {};
        for (let i = 0 ; i < state.stations.length ; i++) {
            stationsForPlaces[state.stations[i].id] = state.stations[i];
        }
        return stationsForPlaces;
    },
};