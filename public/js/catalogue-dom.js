const availableStockTemplateSource = document.querySelector(".availableStockTemplate").innerHTML;
const templateCatalogue = Handlebars.compile(availableStockTemplateSource);
const availableStockElement = document.querySelector(".insertAvailableStockElement");
const shoeCatalogue = ShoeCatalogue();
window.addEventListener('load', function () {
    shoeCatalogue.stockShoes()
        .then(results => {
            availableStockElement.innerHTML = templateCatalogue({
                shoes: results.data.items
            });
        });
});
function addToCart(id) {
    shoeCatalogue.addItemToCart(id)
        .then(results => {
            if (results.data.status === 'success') {
                shoeCatalogue.stockShoes()
                    .then(shoes => {
                        availableStockElement.innerHTML = templateCatalogue({
                            shoes: shoes.data.items
                        });
                    });
            }
        });
};