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
var showButton = document.querySelector("#show-button");

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

//Getting shoes in the Cart from Local Storage
var cartStore = localStorage.getItem('Cart');
var storedCart = JSON.parse(cartStore);

//Getting sthe available shoes from Local Storage
var shoeStore = localStorage.getItem('Shoes');
var storedShoes = JSON.parse(shoeStore);

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
}
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
}
stockButton.addEventListener("click", function () {
  location.hash = "stock"
  availableStockElement.innerHTML = templateCatalogue({
    shoes: shoeCatalogue.shoesInStock()
  });
  insertShoppingCartElement.innerHTML = "";
});
showButton.addEventListener('click', function () {
  insertShoppingCartElement.innerHTML = templateShoppingCart({
    cartShoes: shoeCatalogue.Cart(),
    total: shoeCatalogue.cartTotal()
  });
  insertSearchDataElement.innerHTML = "";
  availableStockElement.innerHTML = "";
});
function addToCart(id) {
  shoeCatalogue.addCart(id);
  if (location.hash === "#home" || location.hash === "#stock") {
    availableStockElement.innerHTML = templateCatalogue({
      shoes: shoeCatalogue.shoesInStock()
    });
  } else if (location.hash === "#search") {
    insertSearchDataElement.innerHTML = templateShoeCatalogue({
      scannedShoes: shoeCatalogue.filteredShoes(colorSelector.value, Number(sizeSelector.value), brandSelector.value)
    });
  }
  localStorage.setItem('Cart', JSON.stringify(shoeCatalogue.Cart()));
  localStorage.setItem('Shoes', JSON.stringify(shoeCatalogue.shoesInStock()));
}
function removeFromCart(id) {
  shoeCatalogue.Remove(id);
  if (location.hash === "#cart") {
    insertShoppingCartElement.innerHTML = templateShoppingCart({
      cartShoes: shoeCatalogue.Cart(),
      total: shoeCatalogue.cartTotal()
    });
    // availableStockElement.innerHTML = templateCatalogue({shoes : shoeCatalogue.shoesInStock()});
  }
  localStorage.setItem('Cart', JSON.stringify(shoeCatalogue.Cart()));
  localStorage.setItem('Shoes', JSON.stringify(shoeCatalogue.shoesInStock()));
}
function checkout() {
  shoeCatalogue.Checkout();
  if (location.hash === "#home") {
    localStorage.removeItem('Cart');
    localStorage.setItem("Shoes", JSON.stringify(shoeCatalogue.shoesInStock()))
    insertShoppingCartElement.innerHTML = "";
    availableStockElement.innerHTML = templateCatalogue({
      shoes: shoeCatalogue.shoesInStock()
    });
    location.hash = "home";
  } else if (location.hash === "#stock") {
    localStorage.removeItem('Cart');
    shoeCatalogue.Checkout();
    localStorage.setItem("Shoes", JSON.stringify(shoeCatalogue.shoesInStock()))
    availableStockElement.innerHTML = templateCatalogue({
      shoes: shoeCatalogue.shoesInStock()
    });
  } else if (location.hash === "#cart") {
    localStorage.removeItem('Cart');
    shoeCatalogue.Checkout();
    localStorage.setItem("Shoes", JSON.stringify(shoeCatalogue.shoesInStock()))
    insertShoppingCartElement.innerHTML = templateShoppingCart({
      cartShoes: shoeCatalogue.Cart(),
      total: shoeCatalogue.cartTotal()
    });
  }
}