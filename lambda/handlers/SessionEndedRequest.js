// NPM Modules
const OpearloAnalytics = require('opearlo-analytics');

// SessionEndedRequest
module.exports = function () {

  console.log('SessionEndedRequest'); // eslint-disable-line no-console

  // Opearlo Analytics
  if (process.env.OPEARLO_USER_ID && process.env.OPEARLO_VOICE_APP_NAME && process.env.OPEARLO_API_KEY) {

    // Record Session Ended Request
    OpearloAnalytics.registerVoiceEvent(this.event.session.user.userId, 'Custom', 'SessionEndedRequest');

    // Record Analytics
    OpearloAnalytics.recordAnalytics(this.event.session.user.userId, process.env.OPEARLO_API_KEY, () => {});
  }
};
