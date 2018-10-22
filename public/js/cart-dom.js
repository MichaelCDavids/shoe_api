const cartTemplate = document.querySelector(".shoppingCartTemplate").innerHTML;
const templateShoppingCart = Handlebars.compile(cartTemplate);
const insertShoppingCartElement = document.querySelector(".insertShoppingCartElement");
const shoeCatalogue = ShoeCatalogue();
window.addEventListener('load', function () {
  shoeCatalogue.cartShoes()
    .then(results => {
      insertShoppingCartElement.innerHTML = templateShoppingCart({
        cartShoes: results.data.items,
        total: results.data.sum
      });

    });
});
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