<template>
	<div>
		<v-app>
			<v-container>
				<loader v-if="loading"></loader>
				<div v-else align="center"
					 justify="center">
					<authPart></authPart>
					<logo
							:width="110"
							:height="50"></logo>
					<homeLanding v-if="!logged"></homeLanding>
					<homeLogged v-if="logged"></homeLogged>
					<pybike></pybike>
				</div>
			</v-container>
		</v-app>
	</div>
</template>

<script>
    import homeLanding from '../components/home_landing';
    import homeLogged from '../components/home_logged';
    import authPart from '../components/auth_part';
    import logo from '../components/logo';
    import loader from '../components/loader';
    import pybike from '../components/pybike';

    export default {
        components: {
            homeLanding,
            authPart,
            homeLogged,
            logo,
            loader,
            pybike,
        },
        data() {
            return {
                user: {},
                logged: false,
                loading: true,
            };
        },
        async mounted() {
            this.logged = this.$auth.loggedIn;
            await this.$store.dispatch('user/setUser');
            this.user = this.$store.getters['user/getUser'];
            this.loading = false;
        },
    };
</script>

<style>
	.v-list-item{
		text-align: left;
	}
</style>
