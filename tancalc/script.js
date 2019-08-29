"use strict";
let products = [];

$(() => {
  $("#addButton").on("click", addProduct);
  addProduct();
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
  amountField.on("input", (e) => {
    let prodId = e.target.getAttribute("data-product-id");
    products[prodId].amount = parseFloat(e.target.value);
    $("#unitPrice" + prodId).text(products[prodId].unitPrice);
    highlightCheapest();
  });
  amountField.val(newProduct.amount.toString());

  let priceField = pv.find("#priceField").attr("data-product-id", prodsLength);
  priceField.on("input", (e) => {
    let prodId = e.target.getAttribute("data-product-id");
    products[prodId].price = parseFloat(e.target.value);
    $("#unitPrice" + prodId).text(products[prodId].unitPrice);
    highlightCheapest();
  });
  priceField.val(newProduct.price.toString());

  newProduct.view = pv;
}

function highlightCheapest() {
  let minUnitPrice = Math.min.apply(null, products.map(p => p.unitPrice));
  products.forEach(p => {
    if (p.unitPrice === minUnitPrice) {
      p.view.addClass("highlighted");
    } else {
      p.view.removeClass("highlighted");
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