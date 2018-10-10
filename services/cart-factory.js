module.exports = function (pool) {
    async function cartShoes() {
        let query = `select * from cart`;
        let results = await pool.query(query);
        return results.rows;
    };
    async function addToCart(shoeID) {
        let foundShoe = await pool.query('select * from shoes where id=$1', [shoeID.id]);
        let shoe = foundShoe.rows[0];
        console.log(shoe);
        if (shoe.in_stock > 0) {
            let cartShoe = await pool.query('select * from cart where shoe_id=$1', [shoe.id]);
            if (cartShoe.rowCount === 0) {
                await pool.query('insert into cart (shoe_id, qty, total) values ($1, $2, $3)', [shoe.id, 1, 0]);
                await pool.query('update cart set total=$1*qty where shoe_id=$2',[shoe.price,shoe.id]);
            } else {
                await pool.query('update cart set qty=qty+1 where shoe_id=$1', [shoe.id]);
                await pool.query('update cart set total=$1*qty where shoe_id=$2',[shoe.price,shoe.id]);
            }
            await pool.query('update shoes set in_stock=in_stock-1 where id=$1', [shoe.id]);
            let newShoeList = await pool.query('select * from shoes order by id asc;');
            console.log('added shoe to cart');
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