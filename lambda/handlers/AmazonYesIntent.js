// Mailgun
const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN, });

// AMAZON.YesIntent Handler
module.exports = function () {

  // Get Last Intent from Session Attributes
  const lastIntent = this.attributes.lastIntent;

  // Last Intent = Restuarants, Yes in This Context Means Send Email
  if (lastIntent === 'Restaurants') {

    // Get Email Data from Session Attributes
    const userProfile = this.attributes.userProfile;
    const restaurantData = this.attributes.restaurantData[this.attributes.currentRestaurant];

    const emailData = {
      from: `Austin Local <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: userProfile.email,
      subject: 'Austin Local Restaurants!',
      text:
        `
          Hi, ${userProfile.name},\n

          Here's Your Restaurant Details:

          Name -  ${restaurantData.name}
          Location - ${restaurantData.location}
          Rating - ${restaurantData.rating} / 5

          Thanks for using Austin Local!
        `,
    };

    mailgun.messages().send(emailData, (error) => {
      if (error) {

        // Email Error
        console.log('Email Error: ', error); // eslint-disable-line no-console

        this.emit(':tell', 'Sorry, I\'m having trouble sending emails right now. Please try again later.');
      }
      else {
        this.emit(':tell', 'Ok, I\'ve sent you the details via email');
      }
    });
  }

  // No Relevant Last Intent
  else {

    // Respond with Help Intent
    this.emitWithState('AMAZON.HelpIntent');
  }
};
