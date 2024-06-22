const title_Congif = require("../../../config/title_config");
const description_Congif = require("../../../config/description_config");
const keyword_config = require("../../../config/keyword_config");

const Quote = require("../../../models/quote");
const { rawListeners } = require("../../../models/quote");

function quoteController() {
    return {
        async index(req, res) {

            quotes = await Quote.find({ rate: { $eq: 0 } })
            res.render('admin/quotes', {
                quotes: quotes,
                title: title_Congif().admin_quotes,
                description: description_Congif().admin_quotes,
                keyword: keyword_config().admin_quotes,
            })
        },

        async quotes(req, res) {


            let body_quote_id = req.body._id;
            let quote_item = { body_quote_id };
            // for quote id 
            for (const [key, value] of Object.entries(quote_item)) {
                if (value !== undefined) {
                    let quote_id = value
                    final_quote_id = quote_id
                }
            }


            if (req.body.rate <= 0 || !req.body.rate) {
                req.flash('fail', 'Something went wrong')
                // req.flash('success', 'Quoted successfully')
                return res.redirect('/admin/quotes')
            }

            try {
                await Quote.updateOne({ _id: final_quote_id }, { $set: { rate: req.body.rate } })
                req.flash('success', 'Quoted successfully')
            } catch (error) {
                console.log(error)
                req.flash('fail', 'Something went wrong')
                return res.redirect("/admin/quotes");
            }



            return res.redirect("/admin/quotes");
        }

    }
}
module.exports = quoteController