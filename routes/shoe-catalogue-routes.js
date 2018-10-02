module.exports = function(shoesService) {	
	async function showAll(req, res) {
		try {
			let results = await shoesService.shoesInStock(); 
			res.json({status: 'success', items: results})
		}
		catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	async function filteredBySize(req, res) {
		try {
			let size = req.params.size
			let results = await shoesService.allSize(size); 
			res.json({status: 'success', items: results})
		}
		catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	async function filteredByBrand(req, res) {
		try {
			let brand = req.params.brandname
			let results = await shoesService.allBrand(brand); 
			res.json({status: 'success', items: results})
		}
		catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	async function filteredByBrandSize(req, res) {
		try {
			let brand = req.params.brandname
			let size = req.params.size
			let results = await shoesService.allBrandSize(size,brand); 
			res.json({status: 'success', items: results})
		}
		catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	async function addShoe (req, res) {
		try {
			let params = req.body;
			await shoesService.addStockItem(params); 
			let results = await shoesService.shoesInStock();
			res.json({status: 'success', items: results})
		}
		catch (err) {
			
		}
	};
	async function addToCart (req, res) {
		try {
			let shoeID = req.params;
			await shoesService.addToCart(shoeID); 
			let results = await shoesService.shoesInStock();
			res.json({status: 'success', items: results})
		}
		catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	async function showCart(req, res) {
		try {
			let results = await shoesService.shoesInCart()
			res.json({status: 'success', items: results})
		}
		catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};

	return {
		showAll,
		filteredBySize,
		filteredByBrand,
		filteredByBrandSize,
		addShoe,
		addToCart,
		showCart
	}
}
