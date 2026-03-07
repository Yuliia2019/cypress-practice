const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
  //baseUrl2: 'https://qauto.forstudy.space'
    
    },
});
