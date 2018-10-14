let searchButton = document.querySelector("#search-button");

let searchResultsTemplate = document.querySelector(".afterSearchTemplate").innerHTML;
let templateShoeCatalogue = Handlebars.compile(searchResultsTemplate);
let insertSearchDataElement = document.querySelector(".insertSearchDataElement");

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
  let brand = brandSelector.value;
  let size = sizeSelector.value;
  let color = colorSelector.value;
  search(brand, color, size);
  shoeCatalogue.stockShoes()
    .then(results => renderTemplate(results));
});
searchButton.addEventListener('click', function () {
  let brand = brandSelector.value;
  let size = sizeSelector.value;
  let color = colorSelector.value;
  search(brand, color, size);
});
function search(brand, color, size) {
  console.log(brand)
  console.log(color)
  console.log(size)
  if (brand !== '' && size !== '' && color !== '') {
    shoeCatalogue.filterAll(brand, color, size)
      .then(results => renderTemplate(results))
  } else if (brand !== '' && color === '' && size !== '') {
    shoeCatalogue.filterBrandSize(brand, size)
      .then(results => renderTemplate(results))
  } else if (brand !== '' && color !== '' && size === '') {
    shoeCatalogue.filterBrandColor(brand, color)
      .then(results => renderTemplate(results))
  } else if (brand === '' && color !== '' && size !== '') {
    shoeCatalogue.filterColorSize(color, size)
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
function renderTemplate(results) {
  insertSearchDataElement.innerHTML = templateShoeCatalogue({
    searchResults: results.data.items
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
};
function addToCart(id) {
  console.log(id);
  insertSearchDataElement.innerHTML = "";
  shoeCatalogue.addItemToCart(id)
    .then(results => {
      if (results.data.status === 'success') {
        console.log('added shoe to cart');
        shoeCatalogue.stockShoes()
        .then(searched => {
          insertSearchDataElement.innerHTML = templateShoeCatalogue({
            searchResults: searched.data.items
          });
          brandSelector.innerHTML = brandTemplate({
            brands: searched.data.brands
          });
          colorSelector.innerHTML = colorTemplate({
            colors: searched.data.colors
          });
          sizeSelector.innerHTML = sizeTemplate({
            sizes: searched.data.sizes
          });
        });
      }
    });
};