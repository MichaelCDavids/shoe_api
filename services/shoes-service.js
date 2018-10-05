module.exports = function ShoesService(pool) {
    async function getShoes() {
        let results = await pool.query(`select * from shoes ORDER BY id ASC`);
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
    async function getBrands(){
        let brands = await pool.query('select * from brands order by brand_name asc');
        return brands.rows;
    };
    async function getSizes(){
        let sizes = await pool.query('select * from sizes order by size asc');
        return sizes.rows;
    };
    async function getColors(){
        let colors = await pool.query('select * from colors order by color_name asc');
        return colors.rows;
    };
    return {
        shoesInStock: getShoes,
        allBrand: filterBrand,
        allSize: filterSize,
        allBrandSize: filterBrandSize,
        addStockItem: addStock,
        getBrands,
        getColors,
        getSizes
    }
}