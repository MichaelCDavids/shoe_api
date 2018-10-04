var brandSelector = document.querySelector(".brand");
var sizeSelector = document.querySelector(".size");
var searchButton = document.querySelector("#search-button");

var addColor = document.querySelector(".addColor");
var addBrand = document.querySelector(".addBrand");
var addPrice = document.querySelector(".addPrice");
var addSize = document.querySelector(".addSize");
var addStock = document.querySelector(".addStock");
var addButton = document.querySelector("#add-button");

// var checkoutButton = document.querySelector("#checkout-button");
var stockButton = document.querySelector("#stock-button");
var cartButton = document.querySelector("#show-button");

//Template for available stock
var availableStockTemplateSource = document.querySelector(".availableStockTemplate").innerHTML;
var templateCatalogue = Handlebars.compile(availableStockTemplateSource);
var availableStockElement = document.querySelector(".insertAvailableStockElement");

//Template for search results
var templateSource = document.querySelector(".afterSearchTemplate").innerHTML;
var templateShoeCatalogue = Handlebars.compile(templateSource);
var insertSearchDataElement = document.querySelector(".insertSearchDataElement");

//Template for shoppingCart
var templateSource = document.querySelector(".shoppingCartTemplate").innerHTML;
var templateShoppingCart = Handlebars.compile(templateSource);
var insertShoppingCartElement = document.querySelector(".insertShoppingCartElement");

//instance of the factory function
const shoeCatalogue = ShoeCatalogue();

//on page load event
window.addEventListener('load', function () {
  shoeCatalogue.shoesInStock()
    .then(results => {
      availableStockElement.innerHTML = templateCatalogue({
        shoes: results.data.items
      });
    })
});
searchButton.addEventListener('click', function () {
  let brand = brandSelector.value;
  let size = Number(sizeSelector.value);
  search(size, brand);
});
function search(size, brand) {
  if (brand === '' && size === 0) {
    shoeCatalogue.shoesInStock()
      .then(results => renderTemplate(results))
  } else if (brand !== '' && size !== 0) {
    shoeCatalogue.filteredShoes(size, brand)
      .then(results => renderTemplate(results))
  } else if (brand !== '') {
    shoeCatalogue.filterBrand(brand)
      .then(results => renderTemplate(results))
  } else if (size !== 0) {
    shoeCatalogue.filterSize(size)
      .then(results => renderTemplate(results))
  }
};
addButton.addEventListener('click', function () {
  let params = {
    brand: addBrand.value,
    color: addColor.value,
    price: Number(addPrice.value),
    size: Number(addSize.value),
    in_stock: Number(addStock.value)
  };
  shoeCatalogue.addStockItem(params)
    .then(results => {
      if (results.status === 'success') {
        shoeCatalogue
          .shoesInStock()
          .then(shoes => {
            availableStockElement.innerHTML = templateCatalogue({
              shoes: shoes.data.items
            });
          }).catch(function (err) {
            alert(err);
          });
      }
    });
});
function renderTemplate(results) {
  availableStockElement.innerHTML = "";
  insertSearchDataElement.innerHTML = templateShoeCatalogue({
    scannedShoes: results.data.items
  });
};
stockButton.addEventListener("click", function () {
  insertSearchDataElement.innerHTML = "";
  insertShoppingCartElement.innerHTML = "";
  shoeCatalogue.shoesInStock()
    .then(results => {
      availableStockElement.innerHTML = templateCatalogue({
        shoes: results.data.items
      });
    })
});
cartButton.addEventListener('click', function () {
  insertSearchDataElement.innerHTML = "";
  availableStockElement.innerHTML = "";
  shoeCatalogue.shoesInCart()
  .then(results => {
    insertShoppingCartElement.innerHTML = templateShoppingCart({
      cartShoes: results.data.items
    });
  })


});
function addToCart(id) {
  shoeCatalogue.addItemToCart(id)
  .then(results => {
    availableStockElement.innerHTML = templateCatalogue({
      shoes: results.data.items
    });
  }) 
};
function removeFromCart(id) {
  shoeCatalogue.removeFromCart(id)
  .then(results => {
    insertShoppingCartElement.innerHTML = templateShoppingCart({
      cartShoes: results.data.items
    });
  })
};
function checkout() {
  shoeCatalogue.checkout()
  .then(results => {
    insertShoppingCartElement.innerHTML = templateShoppingCart({
      cartShoes: results.data.items
    });
  })
};