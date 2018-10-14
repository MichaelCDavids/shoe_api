let addColor = document.querySelector(".addColor");
let addBrand = document.querySelector(".addBrand");
let addPrice = document.querySelector(".addPrice");
let addSize = document.querySelector(".addSize");
let addStock = document.querySelector(".addStock");
let addButton = document.querySelector("#add-button");

const shoeCatalogue = ShoeCatalogue();

window.addEventListener('load', function () {
});
addButton.addEventListener('click', function () {
  let params = {
    brand: addBrand.value,
    color: addColor.value,
    price: Number(addPrice.value),
    size: Number(addSize.value),
    in_stock: Number(addStock.value)
  };
  shoeCatalogue.addItem(params).then(results => {
    if (results.data.status === 'success') {
      console.log('added shoe')
    }
  })
});
