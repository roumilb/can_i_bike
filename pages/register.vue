<template>
	<v-app id="inspire">
		<v-content>
			<v-container
					class="fill-height"
					fluid>
				<v-row
						align="center"
						justify="center">
					<v-col
							cols="12"
							sm="8"
							md="4">
						<v-card class="elevation-12">
							<v-toolbar
									color="#343434"
									dark
									flat>
								<v-toolbar-title>Login form</v-toolbar-title>
								<v-spacer />
							</v-toolbar>
							<v-card-text>
								<v-form>
									<v-text-field
											v-model="user.email"
											:rules="emailRules"
											label="E-mail"
											required
									></v-text-field>
									<v-text-field
											v-model="user.password"
											label="Password"
											type="password"
											required
									></v-text-field>
									<v-text-field
											v-model="user.passwordConfirm"
											label="Confirm password"
											type="password"
											required
									></v-text-field>
									<v-autocomplete
											v-model="user.city"
											:items="cities"
											label="Choose your city..."
											class="mt-5"
											solo
									></v-autocomplete>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<p class="not_registered">You already have an account?</p>
								<nuxt-link text to="/login" class="not_registered">Login</nuxt-link>
								<v-spacer />
								<v-btn class="button_primary" @click="submitForm">Register</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
    export default {
        middleware({store, redirect}) {
            // If the user is authenticated
            if (store.$auth.loggedIn) {
                return redirect('/');
            }
        },
        data: () => {
            return {
                user: {
                    email: '',
                    password: '',
                    passwordConfirm: '',
                    city: '',
                },
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
                cities: [],
            };
        },
        async mounted() {
            await this.$store.dispatch('cities/setCities');
            this.cities = this.$store.getters['cities/getCities'];
        },
        methods: {
            submitForm() {
                if (this.user.password !== this.user.passwordConfirm) {
                    alert('Password must be identical');
                    return false;
                }

                if (this.user.city === '' || this.user.email === '') {
                    alert('You must set every inputs');
                    return false;
                }

                this.$axios.post('/api/auth/register', {user: this.user})
                    .then(res => {
                        this.$auth.setUserToken(res.data.token)
                            .then(() => console.log(res.data.token));
                    });
            },
        },
    };
</script>

<style>
</style>