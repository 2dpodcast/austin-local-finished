// NPM Modules
const OpearloAnalytics = require('opearlo-analytics');

// LaunchRequest Handler
module.exports = function () {

  // Get Opearlo Voice Content
  OpearloAnalytics.getVoiceContent(process.env.OPEARLO_USER_ID, process.env.OPEARLO_VOICE_APP_NAME, process.env.OPEARLO_API_KEY, 'welcome-message', (result) => {

    // Respond to User
    this.emit(':ask', result, result);
  });

};
