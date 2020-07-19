// include express
const express = require('express');
const app = express();
// include exp-handlebars
const exphbs = require('express-handlebars');
const restaurantList = require('./restaurant.json');

// variables
const port = 3000;

//set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// set static files
app.use(express.static('public'));

// route setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results });
});

// show info
app.get('/restaurants/:res_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.res_id
  );
  res.render('show', { restaurant: restaurant });
});

// search bar
app.get('/search', (req, res) => {
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name
      .toLowerCase()
      .includes(req.query.keyword.toLowerCase());
  });
  res.render('index', { restaurants: restaurants, keyword: req.query.keyword });
});

//listen
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
