let searchButton = document.querySelector("#search-button");

let addColor = document.querySelector(".addColor");
let addBrand = document.querySelector(".addBrand");
let addPrice = document.querySelector(".addPrice");
let addSize = document.querySelector(".addSize");
let addStock = document.querySelector(".addStock");
let addButton = document.querySelector("#add-button");

let stockButton = document.querySelector("#stock-button");
let cartButton = document.querySelector("#show-button");

let availableStockTemplateSource = document.querySelector(".availableStockTemplate").innerHTML;
let templateCatalogue = Handlebars.compile(availableStockTemplateSource);
let availableStockElement = document.querySelector(".insertAvailableStockElement");

let searchResultsTemplate = document.querySelector(".afterSearchTemplate").innerHTML;
let templateShoeCatalogue = Handlebars.compile(searchResultsTemplate);
let insertSearchDataElement = document.querySelector(".insertSearchDataElement");

let cartTemplate = document.querySelector(".shoppingCartTemplate").innerHTML;
let templateShoppingCart = Handlebars.compile(cartTemplate);
let insertShoppingCartElement = document.querySelector(".insertShoppingCartElement");

let brandSource = document.querySelector(".brandDropdown").innerHTML;
let brandTemplate = Handlebars.compile(brandSource);
let brandSelector = document.querySelector(".brand");

let colorSource = document.querySelector(".colorDropdown").innerHTML;
let colorTemplate = Handlebars.compile(colorSource);
let colorSelector = document.querySelector(".color");

let sizeSource = document.querySelector(".sizeDropdown").innerHTML;
let sizeTemplate = Handlebars.compile(sizeSource);
let sizeSelector = document.querySelector(".size");




const shoeCatalogue = ShoeCatalogue();

window.addEventListener('load', function () {
  shoeCatalogue.stockShoes()
    .then(results => {
      availableStockElement.innerHTML = templateCatalogue({
        shoes: results.data.items
      });
      brandSelector.innerHTML = brandTemplate({
        brands: results.data.brands
      });
      sizeSelector.innerHTML = sizeTemplate({
        sizes: results.data.sizes
      });
      addBrand.innerHTML = brandTemplate({
        brands: results.data.brands
      });
      addColor.innerHTML = colorTemplate({
        colors: results.data.colors
      });
      addSize.innerHTML = sizeTemplate({
        sizes: results.data.sizes
      });
    })
});
searchButton.addEventListener('click', function () {
  let brand = brandSelector.value;
  let size = sizeSelector.value;
  search(size, brand);
});
function search(size, brand) {
  if (brand === '' && size !== 0) {
    shoeCatalogue.stockShoes()
      .then(results => renderTemplate(results))
  } else if (brand !== 0 && size !== 0) {
    shoeCatalogue.filterBrandSize(size, brand)
      .then(results => renderTemplate(results))
  } else if (brand !== 0) {
    shoeCatalogue.filterBrand(brand)
      .then(results => renderTemplate(results))
  } else if (size !== 0) {
    shoeCatalogue.filterSize(size)
      .then(results => renderTemplate(results))
  } 
};
addButton.addEventListener('click', function () {
  let params = {
    brand: Number(addBrand.value),
    color: Number(addColor.value),
    price: Number(addPrice.value),
    size: Number(addSize.value),
    in_stock: Number(addStock.value)
  };
  shoeCatalogue.addItem(params)
    .then(results => {
      if (results.status === 'success') {
        shoeCatalogue
          .stockShoes()
          .then(shoes => {
            availableStockElement.innerHTML = templateCatalogue({
              shoes: shoes.data.items
            });
          }).catch(function (err) {
            alert(err);
          });
      };
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
  shoeCatalogue.stockShoes()
    .then(results => {
      availableStockElement.innerHTML = templateCatalogue({
        shoes: results.data.items
      });
    })
});
cartButton.addEventListener('click', function () {
  insertSearchDataElement.innerHTML = "";
  availableStockElement.innerHTML = "";
  shoeCatalogue.cartShoes()
    .then(results => {
      insertShoppingCartElement.innerHTML = templateShoppingCart({
        cartShoes: results.data.items,
        total: results.data.sum 
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
        cartShoes: results.data.items,
        total: results.data.sum 
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