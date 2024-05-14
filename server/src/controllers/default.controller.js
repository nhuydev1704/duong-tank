const axios = require('axios');
const catchAsync = require('../utils/catchAsync');

const searchMap = catchAsync(async (req, res) => {
  const searchResults = await axios.get(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query.search}&key=AIzaSyDHIKGQrYPpZARfLv3M6Wq1wr--WkcrNpU`
  );

  res.send(searchResults.data.results);
});

module.exports = {
  searchMap,
};
