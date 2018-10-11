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
      colorSelector.innerHTML = colorTemplate({
        colors: results.data.colors
      });
      sizeSelector.innerHTML = sizeTemplate({
        sizes: results.data.sizes
      });
    });
});
searchButton.addEventListener('click', function () {
  let brand = brandSelector.value;
  let size = sizeSelector.value;
  let color = colorSelector.value;
  search(brand, color, size);
});
function search(brand, color, size) {
  if (brand !== '' && size !== '' && color !== '') {
    shoeCatalogue.filterAll(brand,color,size)
      .then(results => renderTemplate(results))
  } else if (brand !== '' && color === '' && size !== '' ) {
    shoeCatalogue.filterBrandSize(brand, size)
      .then(results => renderTemplate(results))
  } else if (brand !== '' && color !== '' && size === '') {
    shoeCatalogue.filterBrandColor(brand, color)
      .then(results => renderTemplate(results))
  } else if (brand === '' && color !== '' && size !== '') {
    shoeCatalogue.filterColorSize(color,size)
      .then(results => renderTemplate(results))
  } else if (brand !== '' && color === '' && size === '') {
    shoeCatalogue.filterBrand(brand)
      .then(results => renderTemplate(results))
  } else if (brand === '' && color !== '' && size === '') {
    shoeCatalogue.filterColor(color)
      .then(results => renderTemplate(results))
  } else if (brand === '' && color === '' && size !== '') {
    shoeCatalogue.filterSize(size)
      .then(results => renderTemplate(results))
  } else {
    shoeCatalogue.stockShoes()
      .then(results => renderTemplate(results))
  }
};
addButton.addEventListener('click', function () {
  let params = {
    brand: addBrand.value,
    color: addColor.value,
    price: addPrice.value,
    size: Number(addSize.value),
    in_stock: Number(addStock.value)
  };
  shoeCatalogue.addItem(params)
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
  console.log(id);
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