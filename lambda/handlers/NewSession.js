// NPM Modules
const axios = require('axios');

// NewSession Handler
module.exports = function () {

  // Check for Access Token
  const accessToken = this.event.session.user.accessToken;

  // No Access Token
  if (!accessToken) {

    // Respond to User Link Account Card
    this.emit(':tellWithLinkAccountCard', 'Please link your account to use this Skill. I\'ve sent the details to your Alexa App');
  }

  // Access Token --> Account Linked
  else {

    // Amazon Profile Request
    const amazonProfileRequest = {
      method: 'get',
      url: 'https://api.amazon.com/user/profile',
      params: {
        access_token: accessToken,
      },
    };

    // Get Amazon Profile
    axios(amazonProfileRequest)
      .then((response) => {

        // Log Amazon Profile Response
        console.log(`Amazon Profile Response: ${JSON.stringify(response.data, null, 2)}`); // eslint-disable-line no-console

        // Store Amazon Profile in DynamoDB
        this.attributes.userProfile = response.data;
        this.attributes.lastResponse = null;

        // Check for User Attributes in Dynamo DB
        const timesUsed = this.attributes.timesUsed;

        // First Ever Use
        if (!timesUsed) {

          // Set Times Used to 1
          this.attributes.timesUsed = 1;

          // Respond to User With Onboarding Message
          this.emit(':ask',
            `
              Welcome to Austin Local!
              Thanks for enabling this Skill. I think you'll find it great source of local info.
              You can ask me for local news, events, attractions, and facts, or say help for more information.
              So, what will it be?
            `,
             'How can I help?'
           );
        }

        // Not First Ever Use --> Route to Original Request Type
        else if (this.event.request.type === 'IntentRequest') {

          // Increment Times Used
          this.attributes.timesUsed += 1;

          // Route to Original Intent
          this.emitWithState(this.event.request.intent.name);
        }
        else {

          // Route to Launch Request
          this.emitWithState('LaunchRequest');
        }

      })
      .catch((error) => {

        // Log Amazon Profile API Error
        console.log('Amazon Profile API Error: ', error); // eslint-disable-line no-console

        // Respond to User Link Account Card
        this.emit(':tellWithLinkAccountCard', 'I had trouble accessing your profile. Please re-link your account.');
      });
  }
};
