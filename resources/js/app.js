import axios from "axios";
import Noty from "noty";
// import {intiAdmin} from './admin.js'
import moment from "moment";
import order from "../../app/models/order";
import initAdmin from "./admin";


// home page  funtiona

let file;

window.addEventListener('load', () => {
  // console.log('File loaded')
  file = document.querySelector('#files');
  // console.log('Windows loaded file: ', file)
})

if (window.location.pathname == "/") {
  let nav = document.querySelector("nav");
  let logo = document.querySelector("#nav_logo");
  let home = document.querySelector("#home");
  let right_nav = document.querySelector("#right_nav > ul");
  let home_img = document.querySelector("#home_banner_img");
  let home_img2 = document.querySelector("#home_banner_img2");

  nav.style.backgroundColor = "#090f1b";
  nav.style.boxShadow = "none";
  logo.style.color = "#ffffff";
  right_nav.style.color = "#ffffff";
  home_img.style.display = "none";

  window.onscroll = () => {
    if (window.pageYOffset < home.offsetHeight) {
      nav.style.backgroundColor = "#090f1b";
      nav.style.boxShadow = "none";
      logo.style.color = "#ffffff";
      right_nav.style.color = "#ffffff";
    } else {
      if (window.pageYOffset > home.offsetHeight) {
        nav.style.backgroundColor = "#ffffff";
        right_nav.style.color = "#111";
        nav.style.transition = "all 0.5s ease-in-out";
        nav.style.boxShadow = "0rem 0.2rem 1.2rem 0rem rgba(0, 0, 0, 0.05)";
        logo.style.color = "#111";
      }
    }
  };

  setTimeout(function () {
    home.classList.add("home_banner_animation");
    home_img.style.display = "block";
  }, 3500);
}
// for quotes page accordidian btn positioning 
if (window.location.pathname == "/admin/quotes" || window.location.pathname == "/admin/quotes/") {
  let accordian_btn = document.querySelectorAll(".accordion__button")
  accordian_btn.forEach((accordian_btn) => {
    accordian_btn.style.left = "88vw";
  });


}

// profile page js

function product_img(smallImg) {
  var fullImg = document.getElementById("imageBox");
  fullImg.src = smallImg.src;
}


// nav drop down
const profile_img = document.querySelector("#user_profile_img");
if (profile_img) {
  profile_img.addEventListener("click", () => {
    let dropdown = document.getElementById("profile_drop_down");
    if (dropdown.style.display != "none") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  });
}

const fileuploadBtn = document.querySelector('.fileuploadBtn');
async function updateCart(product) {
  fileuploadBtn.click();
  axios({
    method: 'POST',
    url: '/update-cart',
    data: product,
  }).then((res) => {
    new Noty({
      type: "success",
      timeout: 2000,
      text: "Item added to your quotes",
      progressBar: false,
    }).show();
  })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 200000,
        text: "Something went wrong",
        progressBar: false,
      }).show();
    });
}

function updateOrder(QuoteId) {
  // for consoling

  axios.post("/orders", QuoteId).then((res) => {
    // console.log(res)
  });
}


// admin quote 
function updatequotes(quote) {
  axios.post("/admin/quotes", quote).then((res) => {
  });
}


// fetching product detail

const url_unicode_check = window.location.pathname;

// if (url_unicode_check.includes('ptt:fc')) {
//   console.log("haiga")
// }

if (url_unicode_check.includes("ptt:ls")) {
  let pms = document.querySelector(".pms_color");
  pms.style.margin = "0px";
}

let request_quote_btn = document.querySelector("#request_quote_btn");
let randomToken = document.querySelector('.randomToken');
if (request_quote_btn) {
  async function get_product_value() {
    request_quote_btn.addEventListener("click", (e) => {
      // fetch data set value of view file and converting it into a obeject
      let product = JSON.parse(request_quote_btn.dataset.product);
      // console.log("ger", product)
      //  job name
      let job_name = document.getElementsByName("job_name")[0].value;
      product.job_name = job_name;
      product.randomToken = randomToken.value;

      // size value
      let lenght = document.getElementsByName("lenght")[0].value;
      product.lenght = lenght;
      if (
        product.category == "folded carton" ||
        product.category == "corrugated "
      ) {
        let height = document.getElementsByName("height")[0].value;
        product.height = height;
      }
      let width = document.getElementsByName("width")[0].value;
      product.width = width;

      // categories value

      let printing_type = document.getElementsByName("printing_type");

      for (var i = 0, length = printing_type.length; i < length; i++) {
        if (printing_type[i].checked) {
          // do whatever you want with the checked radio
          const printing_type_value = printing_type[i].value;
          product.printing_type = printing_type_value;
          // only one radio can be logically checked, don't check the rest
          break;
        }
      }

      // paper board
      if (product.category == "corrugated ") {
        if (product.title == "regular box") {
          let regular_cg_bottom_type = document.getElementsByName(
            "regular_cg_bottom_type"
          )[0].value;
          product.bottom_type = regular_cg_bottom_type;
        }

        // inner_paper
        let inner_paper = document.getElementsByName("cg_inner_paper_board")[0]
          .value;
        product.inner_paper = inner_paper;
        // middle_paper
        let middle_paper = document.getElementsByName(
          "cg_middle_paper_board"
        )[0].value;
        product.middle_paper = middle_paper;
        // top_paper
        let top_paper = document.getElementsByName("cg_top_paper_board")[0].value;
        product.top_paper = top_paper;

        // adding bf
        // inner_paper_bf
        let inner_paper_bf = document.getElementsByName("cg_bf_inner")[0].value;
        product.inner_paper_bf = inner_paper_bf;
        // middle_paper_bf
        let middle_paper_bf = document.getElementsByName("cg_bf_middle")[0]
          .value;
        product.middle_paper_bf = middle_paper_bf;
        // top_paper_bf
        let top_paper_bf = document.getElementsByName("cg_bf_top")[0].value;
        product.top_paper_bf = top_paper_bf;
      } else {
        let paper_board = document.getElementsByName("paper_board")[0].value;
        product.paper_board = paper_board;
      }

      if (product.title == "roll sticker") {
      } else {
        if (product.title == "sticker") {
        } else {
          if (product.category == "corrugated ") {
            // inner_paper_gsm
            let inner_paper_gsm = document.getElementsByName(
              "cg_inner_paper_gsm"
            )[0].value;
            product.inner_paper_gsm = inner_paper_gsm;

            // middle_paper_gsm
            let middle_paper_gsm = document.getElementsByName(
              "cg_middle_paper_gsm"
            )[0].value;
            product.middle_paper_gsm = middle_paper_gsm;

            // top_paper_gsm
            let top_paper_gsm = document.getElementsByName(
              "cg_top_paper_gsm"
            )[0].value;
            product.top_paper_gsm = top_paper_gsm;
          } else {
            let gsm = document.getElementsByName("paper_board_gsm")[0].value;
            product.gsm = gsm;
          }
        }
      }

      // color  customization  value

      if (
        product.category == "folded carton" ||
        product.category == "corrugated " ||
        product.category == "label & sticker"
      ) {
        if (product.title == "roll sticker") {
          let pms_color = document.getElementsByName("pms_color")[0].value;
          if (pms_color >= 1) {
            product.pms_color = pms_color;
          }
        } else {
          if (product.title == "paper label") {
            let pms_color = document.getElementsByName("pms_color")[0].value;
            if (pms_color >= 1) {
              product.pms_color = pms_color;
            }
          } else if (product.title == "sticker") {
            let pms_color = document.getElementsByName("pms_color")[0].value;
            if (pms_color >= 1) {
              product.pms_color = pms_color;
            }
          } else {
            let pms_color = document.getElementsByName("pms_color")[0].value;
            let cmyk = document.getElementsByName("cmyk")[0].value;
            product.cmyk = cmyk;
            if (pms_color >= 1) {
              product.pms_color = pms_color;
            }
          }
        }
      }

      if (product.category == "instruction manual & leaflet") {
        let no_of_color = document.getElementsByName("no_of_color")[0].value;
        if (no_of_color == "na") {
          // product.no_of_color = pms_color
        } else {
          product.no_of_color = no_of_color;
        }

        let no_of_printed_face = document.getElementsByName(
          "no_of_printed_face"
        )[0].value;
        product.printed_faces = no_of_printed_face;
        let no_of_folds = document.getElementsByName("no_of_folds")[0].value;
        product.folds = no_of_folds;

        let multicolor = document.getElementsByName("multicolor")[0];
        if (multicolor.checked == true) {
          product.multicolor = "yes";
        } else {
          product.multicolor = "no";
        }
      }
      if (product.category == "label & sticker") {
        if (product.title == "roll sticker") {
        } else {
          if (product.title == "paper label") {
          } else {
            let label_cut_type = document.getElementsByName("label_cut_type")[0]
              .value;
            product.label_cut_type = label_cut_type;
          }
        }
      }

      // coating customization  value
      const coating = document.querySelectorAll(
        'input[name="coating"]:checked'
      );

      let coatings = [];
      if ((coatings.length = 0)) {
        // do noting
      } else {
        coating.forEach((checkbox) => {
          coatings.push(checkbox.value);
          product.coating = coatings;
        });
      }

      // quantity customization  value
      let quantity = document.getElementsByName("quantity")[0].value;
      product.quantity = quantity;

      // optional customization  value
      const optional_customization = document.querySelectorAll(
        'input[name="optional_customization"]:checked'
      );

      let optional_customizations = [];
      if ((optional_customizations.length = 0)) {
        // do noting
      } else {
        optional_customization.forEach((checkbox) => {
          optional_customizations.push(checkbox.value);
          product.optional_customization = optional_customizations;
        });
      }

      // optional finishing packagin customization  value
      const optional_finishing_packaging = document.querySelectorAll(
        'input[name="optional_finishing_packaging"]:checked'
      );

      let optional_finishing_packagings = [];
      if ((optional_finishing_packagings.length = 0)) {
        // do noting
      } else {
        optional_finishing_packaging.forEach((checkbox) => {
          optional_finishing_packagings.push(checkbox.value);
          product.optional_finishing_packaging = optional_finishing_packagings;
        });
      }
      // designs

      updateCart(product);

    });
  }
  get_product_value();
}

// dashboard accordian
document.querySelectorAll(".accordion__button").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("accordion__button--active");
  });
});


// order data fetching
let order_data = document.querySelectorAll(".final_order_data");
if (order_data) {
  order_data.forEach((btn) => {

    btn.addEventListener("click", (e) => {
      let QuoteIdfun = JSON.parse(btn.dataset.quote_id);
      let QuoteId = { QuoteId: QuoteIdfun };
      updateOrder(QuoteId);
    });
  });
}
// admin quote rate update  
let admin_quote_data = document.querySelectorAll(".quote_rates_data");
if (admin_quote_data) {
  admin_quote_data.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let quote = JSON.parse(btn.dataset.quoterate);
      updatequotes(quote);
    });
  });
}

// Remove alert message after X seconds
const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}

// Change order status
let statuses = document.querySelectorAll(".status_line");
let hiddenInput = document.querySelector("#hiddenInput");
let orderSingle = hiddenInput ? hiddenInput.value : null;
orderSingle = JSON.parse(orderSingle);

let time = document.createElement("small");

function updateStatus(orderorderSingle) {
  statuses.forEach((status) => {
    status.classList.remove("step-completed");
    status.classList.remove("current");
  });
  let stepCompleted = true;
  statuses.forEach((status) => {
    let dataProp = status.dataset.status;
    if (stepCompleted) {
      status.classList.add("step-completed");
    }
    if (dataProp === orderorderSingle.status) {
      stepCompleted = false;
      time.innerText = moment(orderorderSingle.updatedAt).format("hh:mm A");
      status.appendChild(time);
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add("current");
      }
    }
  });
}

updateStatus(orderSingle);

// Socket

let socket = io();

// Join
if (orderSingle) {
  socket.emit("join", `order_${orderSingle._id}`);
}
let adminAreaPath = window.location.pathname;
if (adminAreaPath.includes("admin")) {
  initAdmin(socket);
  socket.emit("join", "adminRoom");
}

socket.on("orderUpdated", (data) => {
  const updatedOrder = { ...orderSingle };
  updatedOrder.updatedAt = moment().format();
  updatedOrder.status = data.status;

  updateStatus(updatedOrder);
  new Noty({
    type: "success",
    timeout: 1000,
    text: "Order updated",
    progressBar: false,
  }).show();
});
