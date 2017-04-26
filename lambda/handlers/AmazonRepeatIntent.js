// AMAZON.RepeatIntent Handler
module.exports = function () {

  // Get Last Phrase from Session Attributes
  const lastResponse = this.attributes.lastResponse || 'What do you want to do?';

  // Respond to User with Last Phrase
  this.emit(':ask', lastResponse, 'What do you want to do?');
};
