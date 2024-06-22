const title_Congif = require("../../config/title_config");
const description_Congif = require("../../config/description_config");
const keyword_config = require("../../config/keyword_config");

function homeController() {
  return {
    index(req, res) {
      res.render("home", {
        title: title_Congif().home,
        description: description_Congif().home,
        keyword: keyword_config().home,
      });
    },
  };
}

module.exports = homeController;
