// AMAZON.HelpIntent Handler
module.exports = function () {

  // Response
  var helpResponse = 'You can ask me for local news, events, attractions, and facts. What would you like to do?';

  // Save Last Response for use in Repeat
  this.attributes.lastResponse = helpResponse;

  // Respond to User
  this.emit(':ask', helpResponse, helpResponse);
};
