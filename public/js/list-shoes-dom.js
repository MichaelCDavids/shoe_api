const addImage = document.querySelector(".addImage");
const addShoeName = document.querySelector(".addShoeName");
const addColor = document.querySelector(".addColor");
const addBrand = document.querySelector(".addBrand");
const addPrice = document.querySelector(".addPrice");
const addSize = document.querySelector(".addSize");
const addStock = document.querySelector(".addStock");
const addButton = document.querySelector("#add-button");
const messageTemplateSource = document.querySelector(".flashMessages").innerHTML;
const MessagesTemplate = Handlebars.compile(messageTemplateSource);
const flashMessagesElement = document.querySelector(".flashMessagesElement");
const shoeCatalogue = ShoeCatalogue();
addButton.addEventListener('click', function () {
  let params = {
    image: addImage.value,
    name: addShoeName.value,
    brand: addBrand.value,
    color: addColor.value,
    price: Number(addPrice.value),
    size: Number(addSize.value),
    in_stock: Number(addStock.value)
  };
  if (params.name === '') {
    flashMessagesElement.innerHTML = "No name was entered";
  } else if (params.brand === '') {
    flashMessagesElement.innerHTML = "No brand was entered";
  } else if (params.color === '') {
    flashMessagesElement.innerHTML = "No color was entered";
  } else if (params.price === 0) {
    flashMessagesElement.innerHTML = "No price was entered";
  } else if (params.size === 0) {
    flashMessagesElement.innerHTML = "No size was entered";
  } else if (params.in_stock === 0) {
    flashMessagesElement.innerHTML = "please indicate how much stock you have";
  } else {
    shoeCatalogue.addItem(params).then(results => {
      flashMessagesElement.innerHTML = MessagesTemplate({
        messages: results.data.messages
      });
    })
  }

});