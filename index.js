const {
  Keystone
} = require('@keystonejs/keystone');
const {
  Text
} = require('@keystonejs/fields');
const {
  GraphQLApp
} = require('@keystonejs/app-graphql');
const {
  AdminUIApp
} = require('@keystonejs/app-admin-ui');
const {
  NuxtApp
} = require('@keystonejs/app-nuxt');

const {
  MongooseAdapter: Adapter
} = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = 'keystone5-nuxtjs-vuetify-dashboard';
const adapterConfig = {
  mongoUri: process.env.MONGO_URI || 'mongodb://admin:manager@127.0.0.1/tasks-manager-db'
};

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
});

// importing models
require('./api/models')(keystone);

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp(),
    new NuxtApp({
      srcDir: 'src',
      buildDir: 'dist',
      mode: 'spa',
      dev: (process.env.NODE_ENV !== 'production'),
      /*
       ** Headers of the page
       */
      head: {
        title: process.env.npm_package_name || 'keystone5-nuxtjs-vuetify-dashboard',
        meta: [{
            charset: 'utf-8'
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
          },
          {
            hid: 'description',
            name: 'description',
            content: 'keystone5-nuxtjs-vuetify-dashboard'
          }
        ],
        link: [{
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        }, {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
        }]
      },
      /*
       ** Customize the progress-bar color
       */
      loading: {
        color: '#3B8070'
      },
      /*
       ** Global CSS
       */
      css: [
        '~/assets/style/app.styl'
      ],
      /*
       ** Plugins to load before mounting the App
       */
      plugins: ['~/plugins/vuetify.js'],
      /*
       ** Nuxt.js dev-modules
       */
      buildModules: [],
      /*
       ** Nuxt.js modules
       */
      modules: ['@nuxtjs/style-resources'],
      router: {
        base: process.env.BASE_URL,
        extendRoutes(routes, resolve) {},
        scrollBehavior: function (to, from, savedPosition) {
          if (savedPosition) {
            return savedPosition
          } else {
            return {
              x: 0,
              y: 0
            }
          }
        }
      },
      /*
       ** Build configuration
       */
      build: {
        /*
         ** You can extend webpack config here
         */
        extractCSS: true,
        extend(config, ctx) {
          // Run ESLint on save
          if (ctx.isDev && ctx.isClient) {
            config.module.rules.push({
              enforce: 'pre',
              test: /\.(js|vue)$/,
              loader: 'eslint-loader',
              exclude: /(node_modules)/
            })
          }
        }
      }
    }),
  ],
};