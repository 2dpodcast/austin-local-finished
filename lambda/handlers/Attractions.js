// NPM Modules
const OpearloAnalytics = require('opearlo-analytics');

// Attractions Handler
module.exports = function () {

  // Get Opearlo Voice Content
  OpearloAnalytics.getVoiceContent(process.env.OPEARLO_USER_ID, process.env.OPEARLO_VOICE_APP_NAME, process.env.OPEARLO_API_KEY, 'attractions', (result) => {

    // Set Session Attributes for Context
    this.attributes.lastIntent = 'Attractions';
    this.attributes.lastResponse = result;

    // Respond to User
    this.emit(':ask', `${result}. Would you like to hear another attraction?`, 'Would you like to hear another attraction?');
  });
};
