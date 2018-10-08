module.exports = function ShoesService(pool) {
    async function getShoes() {
        let query = `select * from shoes join brands on brands.id=shoes.brand join colors on colors.id=shoes.color join sizes on sizes.id=shoes.size;`;
        let results = await pool.query(query);
        return results.rows;
    };
    async function getBrands(){
        let brands = await pool.query('select * from brands order by brand_name asc');
        return brands.rows;
    };
    async function getColors(){
        let colors = await pool.query('select * from colors order by color_name asc');
        return colors.rows;
    };
    async function getSizes(){
        let sizes = await pool.query('select * from sizes order by size asc');
        return sizes.rows;
    };
    async function filterBrand(brand) {
        let filteredBrand = await pool.query('select * from shoes where brand=$1 order by id asc', [brand]);
        return filteredBrand.rows;
    };
    async function filterSize(size) {
        let filteredSize = await pool.query('select * from shoes where size=$1 order by id asc', [size]);
        return filteredSize.rows;
    };
    async function filterColor(color){
        let filteredColor = await pool.query('select * from shoes where color=$1 order by id asc', [color]);
        return filteredColor.rows
    };
    async function filterBrandSize(size, brand) {
        let filteredBrandSize = await pool.query('select * from shoes where size=$1 and brand=$2 order by id asc', [size, brand]);
        return filteredBrandSize.rows;
    };
    async function filterBrandColor(brand, color){
        let filteredBrandColor = await pool.query('select * from shoes where brand=$1 and color=$2', [brand, color]);
        return filteredBrandColor.rows;
    };
    async function filterSizeColor(size,color){
        let filteredSizeColor = await pool.query('select * from shoes where size=$1 and color=$2', [size, color]);
        return filteredSizeColor.rows;
    };
    async function filterBrandSizeColor(size,color){
        let filteredBrandSizeColor = await pool.query('select * from shoes where brand=$1 and size=$2 and color=$3', [brand, size, color]);
        return filteredBrandSizeColor.rows;
    };
    async function addStock(shoeData) {
        const shoeDataList = [shoeData.brand, shoeData.price, shoeData.color, shoeData.size, shoeData.in_stock];
        const insertShoeQuery = 'insert into shoes (brand, price, color, size, in_stock) values ($1, $2, $3, $4, $5)';
        await pool.query(insertShoeQuery, shoeDataList);
    };
    return {
        getShoes,
        getBrands,
        getColors,
        getSizes,

        filterBrand,
        filterSize,
        filterColor,
        filterBrandSize,
        filterBrandColor,
        filterSizeColor,
        filterBrandSizeColor,

        addStockItem: addStock 
    };
}