<template>
	<div>
		<v-row align="center" justify="center">
			<v-col cols="12" class="d-flex" sm="6">
				<p><b>Can I bike</b> is a very simple app which allows you to know in real time if you can ride home and have stands to put your bike.</p>
			</v-col>
		</v-row>
		<v-row align="center"
			   justify="center">
			<v-col class="d-flex" cols="12" sm="6">
				<v-autocomplete
						v-model="city"
						:items="cities"
						label="Choose your city..."
						solo
						@change="citySelected"
				></v-autocomplete>
			</v-col>
		</v-row>
		<v-row align="center"
			   justify="center">
			<v-col class="d-flex" cols="12" sm="6">
				<v-text-field
						label="Search for a station"
						placeholder="Search for a station"
						solo
						v-model="searchStation"
						@keyup="searchStations"
				></v-text-field>
			</v-col>
		</v-row>
		<v-row
				justify="center">
			<v-col class="d-flex" cols="12" sm="6">
				<v-card min-width="100%">
					<v-toolbar color="#343434" dark>
						<v-toolbar-title>Stations ({{ stations.length }})</v-toolbar-title>
					</v-toolbar>
					<div style="overflow: auto; max-height: 500px">
						<v-skeleton-loader
								:loading="true"
								type="list-item-two-line"
								v-if="loadingStations"
								v-for="i in loadingSkeletons"
						>
							<v-card-title>Title</v-card-title>
							<v-card-text>Card Text</v-card-text>
						</v-skeleton-loader>
						<v-list-item v-if="stations.length < 1 && !loadingStations">
							<v-list-item-title>No station</v-list-item-title>
						</v-list-item>
						<v-list-item two-line v-for="station in stations" v-bind:key="station.id" :bike="station.bikes" :stand="station.stands" v-else>
							<v-list-item-content>
								<v-list-item-title>{{ station.address }}</v-list-item-title>
								<v-list-item-subtitle>Bikes: {{ station.bikes }} | Stands: {{ station.stands }}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
    export default {
        data: () => {
            return {
                cities: [],
                city: '',
                stations: [],
                searchStation: '',
                items: [
                    'Foo',
                    'Bar',
                    'Fizz',
                    'Buzz',
                ],
                test: '',
                loadingStations: false,
                loadingSkeletons: [
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                ],
            };
        },
        async mounted() {
            await this.$store.dispatch('cities/setCities');
            this.cities = this.$store.getters['cities/getCities'];
        },
        methods: {
            async citySelected() {
                this.loadingStations = true;
                await this.$store.dispatch('stations/setStations', this.city);
                this.stations = this.$store.getters['stations/getStations'];
                this.loadingStations = false;
            },
            searchStations() {
                this.stations = this.$store.getters['stations/getStations'].filter(station => station.name.toLowerCase().indexOf(this.searchStation.toLowerCase()) !== -1);
            },
        },
    };
</script>

<style>

</style>