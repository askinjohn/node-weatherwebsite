/**
 * Render home page
 */
const getHomePage = (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'John',
  });
};

/**
 * Render about page
 */
const getAboutPage = (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Askin John Samuel',
  });
};

/**
 * Render help page
 */
const getHelpPage = (req, res) => {
  res.render('help', {
    helptext: 'For frequently asked questions visit FAQ section',
    title: 'Help Page',
    name: 'Askin',
  });
};

/**
 * Render 404 page for help routes
 */
const getHelpNotFound = (req, res) => {
  res.render('404', {
    errorMessage: 'Help page not found',
    title: 'ERROR',
    name: 'Askin',
  });
};

module.exports = {
  getHomePage,
  getAboutPage,
  getHelpPage,
  getHelpNotFound,
};
