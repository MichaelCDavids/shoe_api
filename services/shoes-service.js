module.exports = function ShoesService(pool) {
    async function getShoes() {
        let results = await pool.query(`select * from shoes`);
        return results.rows;
    }
    async function filterBrand(brand) {
        let filteredBrand = await pool.query('select * from shoes where brand=$1', [brand]);
        return filteredBrand.rows;
    }
    async function filterSize(size) {
        let filteredSize = await pool.query('select * from shoes where size=$1', [size]);
        return filteredSize.rows;
    }
    async function filterBrandSize(size, brand) {
        let filteredBrandSize = await pool.query('select * from shoes where size=$1 and brand=$2', [size, brand]);
        return filteredBrandSize.rows;
    }

    async function addStock(shoeData) {
        const shoeDataList = [shoeData.brand, shoeData.price, shoeData.color, shoeData.size, shoeData.in_stock];
        const insertShoeQuery = 'insert into shoes (brand, price, color, size, in_stock) values ($1, $2, $3, $4, $5)';
        await pool.query(insertShoeQuery, shoeDataList);
    }

    async function sellStock(shoeID){
        await pool.query('delete from shoes where id=$1',[shoeID]);
    }
    return {
        shoesInStock: getShoes,
        allBrand: filterBrand,
        allSize: filterSize,
        allBrandSize: filterBrandSize,
        addStockItem: addStock,
        removeStockItem: sellStock

    }
}