module.exports = function ShoesService(pool) {
    async function getShoes() {
        let query = `select shoes.id as id,brand_name,color_name,price,in_stock,sizes.size as size,image_location as image_location, shoe_name as shoe_name from shoes join brands on brands.id = shoes.brand_id join colors on colors.id = shoes.color_id join sizes on sizes.id = shoes.size_id join images on images.id=shoes.image_location_id join shoe_names on shoe_names.id=shoes.shoe_name_id where in_stock > 0 order by shoes.id`;
        let results = await pool.query(query);
        return results.rows;
    };
    async function getBrands() {
        let brands = await pool.query('select * from brands order by brand_name asc');
        return brands.rows;
    };
    async function getColors() {
        let colors = await pool.query('select * from colors order by color_name asc');
        return colors.rows;
    };
    async function getSizes() {
        let sizes = await pool.query('select * from sizes order by size asc');
        return sizes.rows;
    };
    async function filterBrand(brand) {
        let filteredBrand = await pool.query(`select shoes.id as id, brand_name, color_name, price, in_stock, sizes.size as size from shoes join brands on brands.id=shoes.brand_id join colors on colors.id=shoes.color_id join sizes on sizes.id=shoes.size_id where shoes.brand_id=$1 order by shoes.id asc`, [brand]);
        return filteredBrand.rows;
    };
    async function filterSize(size) {
        let filteredSize = await pool.query('select shoes.id as id, brand_name, color_name, price, in_stock, sizes.size as size from shoes join brands on brands.id=shoes.brand_id join colors on colors.id=shoes.color_id join sizes on sizes.id=shoes.size_id where shoes.size_id=$1 order by shoes.id asc', [size]);
        return filteredSize.rows;
    };
    async function filterColor(color) {
        let filteredColor = await pool.query('select shoes.id as id, brand_name, color_name, price, in_stock, sizes.size as size from shoes join brands on brands.id=shoes.brand_id join colors on colors.id=shoes.color_id join sizes on sizes.id=shoes.size_id where shoes.color_id=$1 order by shoes.id asc', [color]);
        return filteredColor.rows
    };
    async function filterBrandSize(brand, size) {
        let filteredBrandSize = await pool.query('select shoes.id as id, brand_name, color_name, price, in_stock, sizes.size as size from shoes join brands on brands.id=shoes.brand_id join colors on colors.id=shoes.color_id join sizes on sizes.id=shoes.size_id where shoes.brand_id=$1 and shoes.size_id=$2 order by shoes.id asc', [brand, size]);
        return filteredBrandSize.rows;
    };
    async function filterBrandColor(brand, color) {
        let filteredBrandColor = await pool.query('select shoes.id as id, brand_name, color_name, price, in_stock, sizes.size as size from shoes join brands on brands.id=shoes.brand_id join colors on colors.id=shoes.color_id join sizes on sizes.id=shoes.size_id where shoes.brand_id=$1 and shoes.color_id=$2 order by shoes.id asc ', [brand, color]);
        return filteredBrandColor.rows;
    };
    async function filterColorSize(color, size) {
        let filteredSizeColor = await pool.query('select shoes.id as id, brand_name, color_name, price, in_stock, sizes.size as size from shoes join brands on brands.id=shoes.brand_id join colors on colors.id=shoes.color_id join sizes on sizes.id=shoes.size_id where shoes.size_id=$2 and shoes.color_id=$1 order by shoes.id asc', [color, size]);
        return filteredSizeColor.rows;
    };
    async function filterBrandColorSize(brand, color, size) {
        let filteredBrandSizeColor = await pool.query('select shoes.id as id, brand_name, color_name, price, in_stock, sizes.size as size from shoes join brands on brands.id=shoes.brand_id join colors on colors.id=shoes.color_id join sizes on sizes.id=shoes.size_id where shoes.brand_id=$1 and shoes.size_id=$2 and shoes.color_id=$3 order by shoes.id asc', [brand, size, color]);
        return filteredBrandSizeColor.rows;
    };
    async function addStock(shoeData) {
        let brandID = await addBrand(shoeData.brand);
        let colorID = await addColor(shoeData.color);
        let sizeID = await addSize(shoeData.size);
        let imageID = await addImage(shoeData.image);
        let nameID = await addShoeName(shoeData.name);
        const shoeDataList = [imageID, nameID, brandID, shoeData.price, colorID, sizeID, shoeData.in_stock];
        const insertShoeQuery = 'insert into shoes (image_location_id, shoe_name_id, brand_id, price, color_id, size_id, in_stock) values ($1, $2, $3, $4, $5, $6, $7)';
        await pool.query(insertShoeQuery, shoeDataList);
        return "Shoe was added successfully!";
    };
    async function addBrand(brand) {
        query = `select * from brands where brand_name=$1`;
        let foundBrand = await pool.query(query, [brand]);
        if (foundBrand.rowCount === 0) {
            await pool.query('insert into brands (brand_name) values ($1)', [brand]);
            let brandID = await pool.query('select id from brands where brand_name=$1', [brand])
            return brandID.rows[0].id
        } else {
            let brandID = await pool.query('select id from brands where brand_name=$1', [brand])
            return brandID.rows[0].id
        }
    };
    async function addColor(color) {
        query = `select * from colors where color_name=$1`;
        let foundColor = await pool.query(query, [color]);
        if (foundColor.rowCount === 0) {
            await pool.query('insert into colors (color_name) values ($1)', [color]);
            let colorID = await pool.query('select id from colors where color_name=$1', [color])
            return colorID.rows[0].id
        } else {
            let colorID = await pool.query('select id from colors where color_name=$1', [color])
            return colorID.rows[0].id
        }
    };
    async function addSize(size) {
        query = `select * from sizes where size=$1`;
        let foundSize = await pool.query(query, [size]);
        if (foundSize.rowCount === 0) {
            await pool.query('insert into sizes (size) values ($1)', [size]);
            let sizeID = await pool.query('select id from sizes where size=$1', [size])
            return sizeID.rows[0].id
        } else {
            let sizeID = await pool.query('select id from sizes where size=$1', [size])
            return sizeID.rows[0].id
        }
    };
    async function addImage(image) {
        query = `select * from images where image_location=$1`;
        let foundImage = await pool.query(query, [image]);
        if (foundImage.rowCount === 0) {
            await pool.query('insert into images (image_location) values ($1)', [image]);
            let imageID = await pool.query('select id from images where image_location=$1', [image])
            return imageID.rows[0].id
        } else {
            let imageID = await pool.query('select id from images where image_location=$1', [image])
            return imageID.rows[0].id
        }
    };
    async function addShoeName(name) {
        query = `select * from shoe_names where shoe_name=$1`;
        let foundName = await pool.query(query, [name]);
        if (foundName.rowCount === 0) {
            await pool.query('insert into shoe_names (shoe_name) values ($1)', [name]);
            let nameID = await pool.query('select id from shoe_names where shoe_name=$1', [name])
            return nameID.rows[0].id
        } else {
            let nameID = await pool.query('select id from shoe_names where shoe_name=$1', [name])
            return nameID.rows[0].id
        }
    };
    return {
        getShoes,
        getBrands,
        getColors,
        getSizes,
        filterBrand,
        filterColor,
        filterSize,
       
        filterBrandSize,
        filterBrandColor,
        filterColorSize,
        filterBrandColorSize,
        addStockItem: addStock
    };
}