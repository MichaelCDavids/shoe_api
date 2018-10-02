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
        // console.log('from shoes-service: '+shoeID.id);
        let foundShoe = await pool.query('select * from shoes where id=$1', [shoeID.id]);
        let shoe = foundShoe.rows[0];
        // if(foundShoe.in_stock>0){
        //     await pool.query('insert into cart (shoe_id=$1,brand=$2, price, color, size, qty) values (foundShoe.id, foundShoe.brand, foundShoe.price, foundShoe.color, foundShoe.size);');
        // }
        let isThere = false;
        if (shoe.in_stock > 0) {
            
            shoppingCart.map((current) => {
                if (current.id === id) {
                    current.qty += 1;
                    isThere = true;
                };
            });

        //     if (!isThere) {
        //         shoppingCart.push({
        //             id: foundItem.id,
        //             color: foundItem.color,
        //             brand: foundItem.brand,
        //             price: foundItem.price,
        //             size: foundItem.size,
        //             qty: 1
        //         });
        //     };

        //     shoes.map((current) => {
        //         if (current.id === id) {
        //             current.in_stock -= 1;
        //         };
        //     });
         };
    };



    return {
        shoesInStock: getShoes,
        allBrand: filterBrand,
        allSize: filterSize,
        allBrandSize: filterBrandSize,
        addStockItem: addStock,
        addToCart: addShoeToCart
    }
}