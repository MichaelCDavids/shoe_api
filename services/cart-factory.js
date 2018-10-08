module.exports = function (pool) {
    async function cartShoes() {
        let query = `select * from cart join brands on brands.id=cart.brand join colors on colors.id=cart.color join sizes on sizes.id=cart.size order by shoe_id`;
        let results = await pool.query(query);
        return results.rows;
    };
    async function addToCart(shoeID) {
        let foundShoe = await pool.query('select * from shoes where id=$1', [shoeID.id]);
        let shoe = foundShoe.rows[0];
        if (shoe.in_stock > 0) {
            let cartShoe = await pool.query('select * from cart where shoe_id=$1', [shoe.id]);
            if (cartShoe.rowCount === 0) {
                await pool.query('insert into cart (shoe_id, brand, price, color, size, qty, total) values ($1, $2, $3, $4, $5,$6, $7)', [shoe.id, shoe.brand, Number(shoe.price), shoe.color, shoe.size, 1, Number(shoe.price)]);
            } else {
                await pool.query('update cart set qty=qty+1 where shoe_id=$1', [shoe.id]);
                await pool.query('update cart set total=price*qty where shoe_id=$1',[shoe.id]);
            }
            await pool.query('update shoes set in_stock=in_stock-1 where id=$1', [shoe.id]);
            let newShoeList = await pool.query('select * from shoes order by id asc;');
            return newShoeList.rows;
        };
    };
    async function removeFromCart(id) {
        let cartShoe = await pool.query(`select * from cart where shoe_id=$1`, [id]);
        let qty = cartShoe.rows[0].qty;
        if( qty > 0){
            await pool.query(`update cart set qty=qty-1 where shoe_id=$1`, [id]);
            await pool.query('update cart set total=price*qty where shoe_id=$1',[id]);
            await pool.query(`update shoes set in_stock=in_stock+1 where id=$1`, [id]);
            let cartShoeToRemove = await pool.query(`select * from cart where shoe_id=$1`, [id]);
            let newQty = cartShoeToRemove.rows[0].qty;
            if(newQty === 0){
                await pool.query(`delete from cart where shoe_id=$1`, [id]);
            }   
        } 
        let newShoeList = await pool.query('select * from cart order by id asc;');
        return newShoeList.rows;
    };
    async function cartTotal() {
        let cart = await pool.query('select sum(total) from cart');
        return cart.rows[0];
    };
    async function checkout() {
        await pool.query('delete from cart');
        let newShoeList = await pool.query('select * from cart order by id asc;');
        return newShoeList.rows;
    };
    return {
        addToCart,
        cartShoes,
        removeFromCart,
        cartTotal,
        checkout
    };
}