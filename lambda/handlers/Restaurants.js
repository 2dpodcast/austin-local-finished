// NPM Modules
const axios = require('axios');

// Restaurants Handler
module.exports = function () {

  // Cusine Slot
  const cuisineSlot = this.event.request.intent.slots.Cuisine.value || '';

  // Zomato Restaurant Search Request
  const restaurantSearchRequest = {
    method: 'get',
    url: 'https://developers.zomato.com/api/v2.1/search',
    headers: {
      'Accept': 'application/json',
      'user-key': process.env.ZOMATO_API_KEY,
    },
    params: {
      entity_id: '278', // Hard Coded for Chosen Location
      entity_type: 'city', // Hard Coded for Chosen Location
      sort: 'rating', // Sort by Rating
      q: cuisineSlot,
    },
  };

  // Call Zomato API Search Endpoint
  axios(restaurantSearchRequest)
    .then((response) => {

      // Log Zomato Response
      console.log(`Zomato API Response: ${JSON.stringify(response.data, null, 2)}`); // eslint-disable-line no-console

      // Filter Restaurant Data to only Name, Location, Rating
      const restaurantData = response.data.restaurants.map(restaurant => ({
        id: restaurant.restaurant.R.res_id,
        name: restaurant.restaurant.name,
        location: restaurant.restaurant.location.locality_verbose,
        rating: restaurant.restaurant.user_rating.aggregate_rating,
      }));

      // Restaurant Response
      const restaurantResponse =
      `
        How about: ${restaurantData[0].name} in ${restaurantData[0].location}?
        It has an average rating of ${restaurantData[0].rating} out of 5.
        Shall I send you the details?
      `;

      // Store Restuarant Data in Session Attributes
      this.attributes.restaurantData = restaurantData;
      this.attributes.currentRestaurant = 0;
      this.attributes.currentRestaurantId = restaurantData[0].id;

      // Set Session Attributes for Context
      this.attributes.lastIntent = 'Restaurants';
      this.attributes.lastResponse = restaurantResponse;

      // Respond to User
      this.emit(':ask', restaurantResponse, 'Shall I send you the details?');
    })
    .catch((error) => {

      // Log Zomato API Error
      console.log('Zomato API Error: ', error); // eslint-disable-line no-console

      // Respond to User
      this.emit(':tell', 'I had trouble finding any restaurants. Please try again later.');
    });
};
