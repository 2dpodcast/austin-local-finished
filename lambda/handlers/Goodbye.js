// NPM Modules
const OpearloAnalytics = require('opearlo-analytics');

// Goodbye Handler
module.exports = function () {

  // Random Goodbyes
  const randomGoodbyes = [
    'Bye for now!',
    'Thanks for using Austin local!',
    'Chat soon!'
  ];

  // Get Random Googdbye
  const randomGoodbye = randomGoodbyes[Math.floor(Math.random() * randomGoodbyes.length)];

  // Opearlo Analytics
  if (process.env.OPEARLO_USER_ID && process.env.OPEARLO_VOICE_APP_NAME && process.env.OPEARLO_API_KEY) {

    // Record Analytics
    OpearloAnalytics.recordAnalytics(this.event.session.user.userId, process.env.OPEARLO_API_KEY, () => {

      // Respond to User & Close Session
      this.emit(':tell', randomGoodbye);
    });
  }

  else {
    // Respond to User & Close Session
    this.emit(':tell', randomGoodbye);
  }
};
