module.exports = function (pool) {
    function addItemToCart(id) {
        let isThere = false;
        let foundItem = shoes.find((current) => (current.id === id));
        if (foundItem.in_stock > 0) {
            shoppingCart.map((current) => {
                if (current.id === id) {
                    current.qty += 1;
                    isThere = true;
                }
            });

            if (!isThere) {
                shoppingCart.push({
                    id: foundItem.id,
                    color: foundItem.color,
                    brand: foundItem.brand,
                    price: foundItem.price,
                    size: foundItem.size,
                    qty: 1
                });
            }

            shoes.map((current) => {
                if (current.id === id) {
                    current.in_stock -= 1;
                }
            });
        }
    }

    function removeFromCart(id) {
        // for (let k = 0; k < shoes.length; k++) {
        //   if (shoes[k].id === id) {
        //     shoes[k].in_stock += qty;
        //   }
        // }
        let foundItem = shoppingCart.find((current) => (current.id === id));
        console.log(foundItem);
        if (foundItem) {
            shoes.map((current) => {
                if (current.id === foundItem.id) {
                    console.log(current);
                    current.in_stock += foundItem.qty;
                }
            });

        }

        shoppingCart.splice(shoppingCart.indexOf(foundItem), 1);
    }

    function checkout() {
        Total = 0;
        return shoppingCart = [];
    }
    function getCart() {
        return shoppingCart;
    }

    function cartTotal() {
        let subTotal = 0;
        for (let i = 0; i < shoppingCart.length; i++) {
            subTotal += shoppingCart[i].price * shoppingCart[i].qty;
        }
        return Total + subTotal;
    }

    return {
        addCart: addItemToCart,
        Cart: getCart,
        Checkout: checkout,
        Remove: removeFromCart,
        cartTotal: cartTotal
    }
}