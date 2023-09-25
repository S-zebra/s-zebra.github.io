"use strict";
const products = [];

window.onload = function () {
  document.getElementById("addButton").addEventListener("click", addProduct);
  addProduct();
  highlightCheapest();
};

HTMLElement.prototype.addClass = function (cn) {
  if (this.className.indexOf(cn) == -1) {
    this.className += " " + cn;
  }
};

HTMLElement.prototype.removeClass = function (cn) {
  this.className = this.className.replace(new RegExp(" ?" + cn, "g"), "");
};

function addProduct() {
  const newProduct = new Product();
  products.push(newProduct);

  const prodsLength = products.length - 1;

  const pv = document.getElementById("productItemBase").cloneNode(true);
  pv.setAttribute("id", "product" + prodsLength);
  pv.removeClass("noshow");

  document.getElementById("productList").appendChild(pv);

  const unitPriceLabel = pv.querySelector("#unitPrice");
  unitPriceLabel.setAttribute("data-product-id", prodsLength);
  unitPriceLabel.innerText = newProduct.unitPrice();

  ["amount", "price"].forEach(function (f) {
    const field = pv.querySelector("#" + f + "Field");
    field.setAttribute("data-product-id", prodsLength);
    field.addEventListener("input", updateUnitPrice);
    field.value = newProduct[f].toString();
  });

  newProduct.view = pv;
  window.scrollTo(0, document.body.scrollHeight);
}

function updateUnitPrice(e) {
  const prodId = e.target.getAttribute("data-product-id");
  const newValue = parseFloat(e.target.value);
  if (e.target.id.indexOf("price") == 0) {
    products[prodId].price = newValue;
  } else {
    products[prodId].amount = newValue;
  }
  document.querySelector("span[data-product-id='" + prodId + "']").innerText =
    products[prodId].unitPrice().toString().slice(0, 4);
  highlightCheapest();
}

function highlightCheapest() {
  const minUnitPrice = Math.min.apply(
    null,
    products.map(function (p) {
      return p.unitPrice();
    })
  );
  products.forEach(function (p) {
    if (p.unitPrice() == minUnitPrice) {
      p.view.addClass("highlighted");
      p.view.querySelector("#cheapestLabel").removeClass("noshow");
    } else {
      p.view.removeClass("highlighted");
      p.view.querySelector("#cheapestLabel").addClass("noshow");
    }
  });
}

// Fix: Compatibility for iOS 9.x
function Product() {
  this.price = 100;
  this.amount = 100;
  this.view = null;
  this.unitPrice = function () {
    return this.price / this.amount;
  };
}
