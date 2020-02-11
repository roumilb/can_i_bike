<template>
	<div>
		<loader v-if="loading">
		</loader>
		<div v-else>
			<v-row
					align="center"
					justify="center"
					v-for="(place, name) in user.places">
				<v-col class="d-flex" cols="12" sm="6">
					<v-card min-width="100%">
						<v-toolbar
								color="#343434"
								dark
						>
							<v-toolbar-title>{{ name }}</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-btn class="mx-2" text dense icon @click="showAutocomplete(name)" :class="'show__add__station__' + name">
								<v-icon dark>mdi-plus</v-icon>
							</v-btn>
							<v-btn class="mx-2" dense text icon @click="deletePlace(name)">
								<v-icon dark color="#FF4B4B">mdi-delete</v-icon>
							</v-btn>
						</v-toolbar>
						<div style="overflow: auto; max-height: 500px" class="place__stations">
							<div class="place__station__add" v-show="showAddStations[name]">
								<v-autocomplete
										v-model="newStation"
										:items="cityStation"
										label="Choose your add a station"
										solo
										dense
										@change="stationSelected(name)"
										:data-station-add="name"
								></v-autocomplete>
							</div>
							<v-list-item v-if="Object.keys(place).length < 1">
								<v-list-item-title>No station</v-list-item-title>
							</v-list-item>
							<v-list-item two-line v-for="(nameStation, id) in place" v-bind:key="id" v-else class="stations__listing__one">
								<div class="stations__listing__one__overlay" :style="'right:' + (cityStationPlaces[id].stands * 100) / (cityStationPlaces[id].bikes + cityStationPlaces[id].stands) + '%'"></div>
								<v-list-item-content class="station__listing__one">
									<v-list-item-title>{{ nameStation }}</v-list-item-title>
									<v-list-item-subtitle>Bikes: {{ cityStationPlaces[id].bikes }} | Stands: {{ cityStationPlaces[id].stands }}</v-list-item-subtitle>
									<v-btn @click="deleteStation(name, id)" class="button__stations__delete">
										<v-icon dark dense color="#FF4B4B">mdi-delete</v-icon>
									</v-btn>
								</v-list-item-content>
							</v-list-item>
						</div>
					</v-card>
				</v-col>
			</v-row>
			<v-row
					align="center"
					justify="center">
				<v-col class="d-flex" cols="12" sm="6">
					<v-text-field
							v-model="newPlaceName"
							label="New place name"
							dense
					></v-text-field>
					<v-btn class="button_primary ml-3" @click="addStation">Add a station</v-btn>
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script>
    import loader from '../components/loader';

    export default {
        components: {
            loader,
        },
        data() {
            return {
                user: {},
                newPlaceName: '',
                cityStation: [],
                cityStationPlaces: {},
                newStation: '',
                loading: true,
                showAddStations: {},
            };
        },
        async mounted() {
            this.user = this.$auth.user;
            console.log(this.user);
            await this.$store.dispatch('stations/setStations', this.user.city);
            this.cityStation = this.$store.getters['stations/getStationsForSelect'];
            this.cityStationPlaces = this.$store.getters['stations/getStationsForPlaces'];
            if (undefined !== this.user.places && Object.entries(this.user.places).length > 1) {
                for (let [key, value] in Object.entries(this.user.places)) {
                    this.showAddStations[key] = false;
                }
            }
            setTimeout(() => {
                this.loading = false;
            }, 200);
        },
        methods: {
            async addStation() {
                if ((undefined !== this.user.places && this.user.places[this.newPlaceName] !== undefined) || '' === this.newPlaceName) {
                    alert('This place name already exists');
                    return true;
                }
                await this.$store.dispatch('user/setPlaceUser', this.newPlaceName);
                this.showAddStations[this.newPlaceName] = false;
                this.setUser();
                this.newPlaceName = '';
            },
            async stationSelected(place) {
                await this.$store.dispatch('user/setStationUser', {
                    place: place,
                    station: this.cityStationPlaces[this.newStation],
                });
                this.setUser();
                this.showAutocomplete(place);
                this.newStation = '';
            },
            showAutocomplete(name) {
                this.showAddStations[name] = !this.showAddStations[name];
                this.showAddStations = {...this.showAddStations};
                if (this.showAddStations[name]) {
                    document.querySelector('.show__add__station__' + name).classList.add('button__rotate');
                    setTimeout(() => {
                        document.querySelector(`[data-station-add="${name}"]`).focus();
                    }, 200);
                } else {
                    document.querySelector('.show__add__station__' + name).classList.remove('button__rotate');
                }
            },
            async deletePlace(place) {
                if (confirm('Are you sure you want to delete this place?')) {
                    await this.$store.dispatch('user/deletePlace', place);
                    this.setUser();
                }
            },
            async deleteStation(place, stationId) {
                if (confirm('Are you sure you want to delete this station?')) {
                    await this.$store.dispatch('user/deleteStation', {
                        place: place,
                        station: stationId,
                    });
                    this.setUser();
                }
            },
            setUser() {
                this.user = this.$store.getters['user/getUser'];
            },
        },
    };
</script>

<style>
	.place__stations{
		position: relative;
	}

	.place__station__add{
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 100;
	}

	.button__rotate{
		transform: rotate(45deg);
	}

	.station__listing__one{
		position: relative;
	}

	.station__listing__one:hover .button__stations__delete{
		display: block;
	}

	.station__listing__one .button__stations__delete{
		position: absolute;
		right: 10px;
		display: none;
		transition: display .2s;
	}

	.stations__listing__one{
		position: relative;
	}

	.stations__listing__one__overlay{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(200, 200, 200, .5);
	}
</style>