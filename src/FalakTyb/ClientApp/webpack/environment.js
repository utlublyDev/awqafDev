module.exports = {
  // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
  VERSION: process.env.hasOwnProperty("APP_VERSION")
    ? process.env.APP_VERSION
    : "DEV",
 
  SERVER_API_URL: "",
  SERVER_API_URL_File:"https://falakextst.islam.gov.qa"
  
};
