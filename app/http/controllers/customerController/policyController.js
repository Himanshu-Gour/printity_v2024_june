const title_Congif = require("../../../config/title_config");
const description_Congif = require("../../../config/description_config");
const keyword_config = require("../../../config/keyword_config");


function policyController() {
  return {
    privacy_policy(req, res) {
      res.render("policy/privacy-policy", {
        title: title_Congif().privacy_policy,
        description: description_Congif().privacy_policy,
        keyword: keyword_config().privacy_policy,
      });
    },
    terms_conditions(req, res) {
      res.render("policy/terms-conditions", {
        title: title_Congif().terms_conditions,
        description: description_Congif().terms_conditions,
        keyword: keyword_config().terms_conditions,
      });
    },
    refund_policy(req, res) {
      res.render("policy/refund-policy", {
        title: title_Congif().refund_policy,
        description: description_Congif().refund_policy,
        keyword: keyword_config().refund_policy,
      });
    },
  };
}
module.exports = policyController;
