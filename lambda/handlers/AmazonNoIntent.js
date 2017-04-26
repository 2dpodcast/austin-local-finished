// AMAZON.NoIntent Handler
module.exports = function () {

  // Get Last Intent from Session Attributes
  const lastIntent = this.attributes.lastIntent;

  // Last Intent = Restuarants, No in This Context Means Read New Restaurant
  if (lastIntent === 'Restaurants') {

    // Get Restuarant Data from Session Attributes
    const restaurantData = this.attributes.restaurantData;
    const newRestaurant = this.attributes.currentRestaurant + 1;

    // Cycled Through All Restaurants
    if (newRestaurant === restaurantData.length) {

      // Response to User
      this.emit(':ask', 'That was the last restaurant. Can I help with anything else?', 'Can I help with anything else?');
    }

    // More Restaurants
    else {

      // New Restaurant Response
      const newRestaurantResponse =
      `
        How about: ${restaurantData[newRestaurant].name} in ${restaurantData[newRestaurant].location}?
        It has an average rating of ${restaurantData[newRestaurant].rating} out of 5.
        Shall I send you the details?
      `;

      // Update Restuarant Data in Session Attributes
      this.attributes.currentRestaurant = newRestaurant;
      this.attributes.currentRestaurantId = restaurantData[newRestaurant].id;

      // Set Session Attributes for Context
      this.attributes.lastIntent = 'Restaurants';
      this.attributes.lastResponse = newRestaurantResponse;

      // Respond to User
      this.emit(':ask', newRestaurantResponse, 'Shall I send you the details?');
    }
  }

  // No Relevant Last Intent
  else {

    // Respond with Help Intent
    this.emitWithState('AMAZON.HelpIntent');
  }
};
