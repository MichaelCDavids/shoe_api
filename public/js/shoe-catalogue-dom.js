var searchButton = document.querySelector("#search-button");
var addColor = document.querySelector(".addColor");
var addBrand = document.querySelector(".addBrand");
var addPrice = document.querySelector(".addPrice");
var addSize = document.querySelector(".addSize");
var addStock = document.querySelector(".addStock");
var addButton = document.querySelector("#add-button");
var stockButton = document.querySelector("#stock-button");
var cartButton = document.querySelector("#show-button");

var availableStockTemplateSource = document.querySelector(".availableStockTemplate").innerHTML;
var templateCatalogue = Handlebars.compile(availableStockTemplateSource);
var availableStockElement = document.querySelector(".insertAvailableStockElement");

var templateSource = document.querySelector(".afterSearchTemplate").innerHTML;
var templateShoeCatalogue = Handlebars.compile(templateSource);
var insertSearchDataElement = document.querySelector(".insertSearchDataElement");

var templateSource = document.querySelector(".shoppingCartTemplate").innerHTML;
var templateShoppingCart = Handlebars.compile(templateSource);
var insertShoppingCartElement = document.querySelector(".insertShoppingCartElement");

var brandSource = document.querySelector(".brandDropdown").innerHTML;
var brandTemplate = Handlebars.compile(brandSource);
var brandSelector = document.querySelector(".brand");

var colorSource = document.querySelector(".colorDropdown").innerHTML;
var colorTemplate = Handlebars.compile(colorSource);
var colorSelector = document.querySelector(".color")
var sizeSource = document.querySelector(".sizeDropdown").innerHTML;
var sizeTemplate = Handlebars.compile(sizeSource);
var sizeSelector = document.querySelector(".size");

const shoeCatalogue = ShoeCatalogue();
window.addEventListener('load', function () {
  shoeCatalogue.shoesInStock()
    .then(results => {
      availableStockElement.innerHTML = templateCatalogue({
        shoes: results.data.items
      });
      brandSelector.innerHTML = brandTemplate({
        brands: results.data.brands
      });
      colorSelector.innerHTML = colorTemplate({
        colors: results.data.colors
      });
      sizeSelector.innerHTML = sizeTemplate({
        sizes: results.data.sizes
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
    searchResults: results.data.items
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
  insertSearchDataElement.innerHTML = "";
  shoeCatalogue.addItemToCart(id)
  .then(results => {
    availableStockElement.innerHTML = templateCatalogue({
      shoes: results.data.items
    });
  }); 
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