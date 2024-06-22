
function get_product_value() {
    let request_quote_btn = document.querySelector('#request_quote_btn')
    request_quote_btn.addEventListener('click', (e) => {
        // fetch data set value of view file and converting it into a obeject
        let product = JSON.parse(request_quote_btn.dataset.product)

        //  job name
        let job_name = document.getElementsByName("job_name")[0].value
        product.job_name = job_name

        // size value
        let lenght = document.getElementsByName("lenght")[0].value
        let height = document.getElementsByName("height")[0].value
        let width = document.getElementsByName("width")[0].value
        product.lenght = lenght
        product.height = height
        product.width = width

        // categories value


        let printing_type = document.getElementsByName('printing_type');

        for (var i = 0, length = printing_type.length; i < length; i++) {
            if (printing_type[i].checked) {
                // do whatever you want with the checked radio
                const printing_type_value = printing_type[i].value
                product.printing_type = printing_type_value
                // only one radio can be logically checked, don't check the rest
                break;
            }
        }



        // paper board value
        let paper_board = document.getElementsByName("paper_board")[0].value
        let gsm = document.getElementsByName("paper_board_gsm")[0].value
        product.paper_board = paper_board
        product.gsm = gsm


        // color  customization  value
        let pms_color = document.getElementsByName("pms_color")[0].value
        let cmyk = document.getElementsByName("cmyk")[0].value
        product.cmyk = cmyk
        if (pms_color >= 1) {
            product.pms_color = pms_color
        }


        // coating customization  value
        const coating = document.querySelectorAll('input[name="coating"]:checked');

        let coatings = [];
        if (coatings.length = 0) {
            // do noting 
        } else {
            coating.forEach((checkbox) => {
                coatings.push(checkbox.value);
                product.coating = coatings
            });
        }

        // quantity customization  value
        let quantity = document.getElementsByName("quantity")[0].value
        product.quantity = quantity

        // optional customization  value
        const optional_customization = document.querySelectorAll('input[name="optional_customization"]:checked');

        let optional_customizations = [];
        if (optional_customizations.length = 0) {
            // do noting 
        } else {
            optional_customization.forEach((checkbox) => {
                optional_customizations.push(checkbox.value);
                product.optional_customization = optional_customizations
            });
        }

        // optional finishing packagin customization  value
        const optional_finishing_packaging = document.querySelectorAll('input[name="optional_finishing_packaging"]:checked');

        let optional_finishing_packagings = [];
        if (optional_finishing_packagings.length = 0) {
            // do noting 
        } else {
            optional_finishing_packaging.forEach((checkbox) => {
                optional_finishing_packagings.push(checkbox.value);
                product.optional_finishing_packaging = optional_finishing_packagings
            });
        }
        // designs


        const designs = document.getElementsByName('designs');
        product.designs = [designs]


        product.quote_id = uuidv4()
        // console.log(product)

        updateCart(product)
    })

}


module.exports = get_product_value;

