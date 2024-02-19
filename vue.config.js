const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: "/manage-attendance-app/",
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
        sassOptions: {
          indentedSyntax: false,
        },
      },
    },
  },
});
