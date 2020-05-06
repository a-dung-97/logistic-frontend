module.exports = {
    devServer: {
        disableHostCheck: true,
    },

    transpileDependencies: ['vue-world-map', 'vuetify'],
    lintOnSave: false,
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false,
        },
    },
}
