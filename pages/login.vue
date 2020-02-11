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
							sm="12"
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
											label="E-mail"
											required
									></v-text-field>
									<v-text-field
											v-model="user.password"
											label="Password"
											type="password"
											required
									></v-text-field>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<p class="not_registered">You don't have an account?</p>
								<nuxt-link text to="/register" class="not_registered">Register</nuxt-link>
								<v-spacer />
								<v-btn class="button_primary" @click="submitForm">Login</v-btn>
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
                },
            };
        },
        methods: {
            submitForm() {
                this.$auth.loginWith('local', {
                    data: {
                        email: this.user.email,
                        password: this.user.password,
                    },
                });
            },
        },
    };
</script>

<style>
	.card_login{
		padding: 1rem;
		height: auto;
	}

	.button_primary{
		color: white !important;
		background-color: #343434 !important;
	}

	.not_registered{
		margin-bottom: 0 !important;
		font-size: .8rem;
		color: #343434 !important;
		transition: .2s;
	}

	a.not_registered{
		font-weight: bold;
	}
</style>