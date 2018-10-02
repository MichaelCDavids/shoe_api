module.exports = function ShoesService(pool) {
    async function getShoes() {
        let results = await pool.query(`select * from shoes`);
        return results.rows;
    };
    async function filterBrand(brand) {
        let filteredBrand = await pool.query('select * from shoes where brand=$1', [brand]);
        return filteredBrand.rows;
    };
    async function filterSize(size) {
        let filteredSize = await pool.query('select * from shoes where size=$1', [size]);
        return filteredSize.rows;
    };
    async function filterBrandSize(size, brand) {
        let filteredBrandSize = await pool.query('select * from shoes where size=$1 and brand=$2', [size, brand]);
        return filteredBrandSize.rows;
    };
    async function addStock(shoeData) {
        const shoeDataList = [shoeData.brand, shoeData.price, shoeData.color, shoeData.size, shoeData.in_stock];
        const insertShoeQuery = 'insert into shoes (brand, price, color, size, in_stock) values ($1, $2, $3, $4, $5)';
        await pool.query(insertShoeQuery, shoeDataList);
    };
    async function addShoeToCart(shoeID) {
        let foundShoe = await pool.query('select * from shoes where id=$1', [shoeID.id]);
        let shoe = foundShoe.rows[0];
        if (shoe.in_stock > 0) {
            await pool.query('insert into cart (shoe_id, brand, price, color, size, qty) values ($1, $2, $3, $4, $5,$6)', [shoe.id, shoe.brand, shoe.price, shoe.color, shoe.size, 0]);
        }
        await pool.query('update shoes set in_stock=in_stock-1 where id=$1', [shoe.id]);
        await pool.query('update cart set qty=qty+1 where shoe_id=$1', [shoe.id])
    };
    async function getCart() {
        let results = await pool.query(`select * from cart`);
        return results.rows;
    };

    return {
        shoesInStock: getShoes,
        allBrand: filterBrand,
        allSize: filterSize,
        allBrandSize: filterBrandSize,
        addStockItem: addStock,
        addToCart: addShoeToCart,
        shoesInCart: getCart
    }
}