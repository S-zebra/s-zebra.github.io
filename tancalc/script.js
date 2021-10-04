"use strict";
let products = [];

$(function () {
  $("#addButton").on("click", addProduct);
  addProduct();
  highlightCheapest();
});

function addProduct() {
  let newProduct = new Product();
  products.push(newProduct);

  let prodsLength = products.length - 1;

  let pv = $("#productItemBase").clone(true);
  pv.attr("id", "product" + prodsLength);
  pv.removeClass("noshow");
  pv.appendTo($("#productList"));

  let unitPriceField = pv.find("#unitPrice").attr("id", "unitPrice" + prodsLength);
  unitPriceField.text(newProduct.unitPrice);

  let amountField = pv.find("#amountField").attr("data-product-id", prodsLength);
  amountField.on("input", updateUnitPrice);
  amountField.val(newProduct.amount.toString());

  let priceField = pv.find("#priceField").attr("data-product-id", prodsLength);
  priceField.on("input", updateUnitPrice);
  priceField.val(newProduct.price.toString());

  newProduct.view = pv;
  scrollTo(0, document.body.scrollHeight);
}

function updateUnitPrice(e) {
  const prodId = e.target.getAttribute("data-product-id");
  const newValue = parseFloat(e.target.value)
  if (e.target.id.indexOf("price") == 0) {
    products[prodId].price = newValue;
  } else {
    products[prodId].amount = newValue;
  }
  $("#unitPrice" + prodId).text(products[prodId].unitPrice.toString().slice(0, 4));
  highlightCheapest();
}

function highlightCheapest() {
  let minUnitPrice = Math.min.apply(null, products.map(function (p) { return p.unitPrice }));
  products.forEach(function (p) {
    if (p.unitPrice === minUnitPrice) {
      p.view.addClass("highlighted");
      p.view.find("#cheapestLabel").show();
    } else {
      p.view.removeClass("highlighted");
      p.view.find("#cheapestLabel").hide();
    }
  });
}

class Product {
  constructor() {
    this.price = 100;
    this.amount = 100;
    this.view = null;
  }
  get unitPrice() {
    return this.price / this.amount;
  }
}
