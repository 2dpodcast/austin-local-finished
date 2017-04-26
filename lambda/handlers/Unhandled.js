// Unhandled
module.exports = function () {

  // Respond to User
  this.emit(':ask',
    `
      Sorry I didn’t catch that.
      What would you like to do?
    `,
    'Say help to hear more options. What would you like to do?'
  );
};
