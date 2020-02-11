<template>
	<div id="auth_part">
		<div v-if="logged">
			<v-btn @click="logout">Logout</v-btn>
		</div>
		<div v-else>
			<v-btn to="/register">Register</v-btn>
			<v-btn class="button_primary" to="/login">Login</v-btn>
		</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                logged: false,
            };
        },
        mounted() {
            this.logged = this.$auth.loggedIn;
        },
        methods: {
            async logout() {
                console.log('test');
                await this.$auth.logout();
            },
        },
    };
</script>

<style>
	@media screen and (max-width: 600px){

	}

	@media screen and (min-width: 600px){
		#auth_part{
			position: fixed;
			top: 20px;
			right: 20px;
		}
	}
</style>