module.exports = {
    mode: 'universal', /*
  ** Headers of the page
  */
    head: {
        title: 'Can I Bike',
        meta: [
            {charset: 'utf-8'},
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/test.ico',
            },
        ],
    }, /*
  ** Customize the progress-bar color
  */
    loading: {color: '#fff'}, /*
  ** Global CSS
  */
    css: [
        '@/assets/style.css',
    ], /*
  ** Plugins to load before mounting the App
  */
    plugins: [], /*
  ** Nuxt.js dev-modules
  */
    buildModules: [
        // Simple usage
        '@nuxtjs/vuetify',
    ], /*
  ** Nuxt.js modules
  */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth',
    ], /*
  ** Build configuration
  */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        },
    },
    axios: {
        proxy: true,
    },
    proxy: {
        '/api': {
            target: process.env.BASE_URL + '/api' || 'http://localhost:3000/api',
        },
    },
    auth: {
        redirect: {
            login: '/',
            logout: '/login',
        },
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/api/auth/login',
                        method: 'post',
                        propertyName: 'token',
                    },
                    logout: {
                        url: '/api/auth/logout',
                        method: 'post',
                    },
                    user: {
                        url: '/api/auth/user',
                        method: 'get',
                        propertyName: 'user',
                    },
                },
            },
        },
    },
};
