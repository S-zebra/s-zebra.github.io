"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var products = [];
$(function () {
  $("#addButton").on("click", addProduct);
  addProduct();
});

function addProduct() {
  var newProduct = new Product();
  products.push(newProduct);
  var prodsLength = products.length - 1;
  var pv = $("#productItemBase").clone(true);
  pv.attr("id", "product" + prodsLength);
  pv.removeClass("noshow");
  pv.appendTo($("#productList"));
  var unitPriceField = pv.find("#unitPrice").attr("id", "unitPrice" + prodsLength);
  unitPriceField.text(newProduct.unitPrice);
  var amountField = pv.find("#amountField").attr("data-product-id", prodsLength);
  amountField.on("input", function (e) {
    var prodId = e.target.getAttribute("data-product-id");
    products[prodId].amount = parseFloat(e.target.value);
    $("#unitPrice" + prodId).text(products[prodId].unitPrice);
    highlightCheapest();
  });
  amountField.val(newProduct.amount.toString());
  var priceField = pv.find("#priceField").attr("data-product-id", prodsLength);
  priceField.on("input", function (e) {
    var prodId = e.target.getAttribute("data-product-id");
    products[prodId].price = parseFloat(e.target.value);
    $("#unitPrice" + prodId).text(products[prodId].unitPrice);
    highlightCheapest();
  });
  priceField.val(newProduct.price.toString());
  newProduct.view = pv;
}

function highlightCheapest() {
  var minUnitPrice = Math.min.apply(null, products.map(function (p) {
    return p.unitPrice;
  }));
  products.forEach(function (p) {
    if (p.unitPrice === minUnitPrice) {
      p.view.addClass("highlighted");
    } else {
      p.view.removeClass("highlighted");
    }
  });
}

var Product =
/*#__PURE__*/
function () {
  function Product() {
    _classCallCheck(this, Product);

    this.price = 100;
    this.amount = 100;
    this.view = null;
  }

  _createClass(Product, [{
    key: "unitPrice",
    get: function get() {
      return this.price / this.amount;
    }
  }]);

  return Product;
}();