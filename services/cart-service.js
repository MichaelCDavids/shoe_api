module.exports = function (pool) {
    async function removeFromCart(id) {
        let cartShoe = await pool.query(`select * from cart where shoe_id=$1`, [id]);
        await pool.query(`update shoes set in_stock=in_stock+$1 where id=$2`, [cartShoe.rows[0].qty, id]);
        await pool.query(`delete from cart where shoe_id=$1`, [id]);
    };
    async function cartShoes() {
        let results = await pool.query(`select * from cart order by brand asc`);
        return results.rows;
    };
    async function addToCart(shoeID) {
        let foundShoe = await pool.query('select * from shoes where id=$1', [shoeID.id]);
        let shoe = foundShoe.rows[0];
        if (shoe.in_stock > 0) {
            let cartShoe = await pool.query('select from cart where shoe_id=$1', [shoeID.id]);
            if (cartShoe.rowCount === 0) {
                await pool.query('insert into cart (shoe_id, brand, price, color, size, qty) values ($1, $2, $3, $4, $5,$6)', [shoe.id, shoe.brand, shoe.price, shoe.color, shoe.size, 1]);
            } else {
                await pool.query('update cart set qty=qty+1 where shoe_id=$1', [shoe.id])
            }
            await pool.query('update shoes set in_stock=in_stock-1 where id=$1', [shoe.id]);
            let newShoeList = await pool.query('select * from shoes ORDER BY id ASC;');
            return newShoeList.rows;
        };
    };
    async function checkout() {
        await pool.query('delete from cart');
        let newShoeList = await pool.query('select * from cart ORDER BY id ASC;');
        return newShoeList.rows;
    };
    async function cartTotal() {
        let subTotal = 0;
        let cart = await cartShoes()
        cart = cart.rows;
        for (let i = 0; i < cart.length; i++) {
            subTotal += cart[i].price * cart[i].qty;
        }
        return subTotal;
    };

    return {
        removeFromCart,
        cartShoes,
        addToCart,
        checkout,
        cartTotal
    };
}