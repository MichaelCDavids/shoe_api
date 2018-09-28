module.exports = function(shoesService, cartService) {	
	async function showAll(req, res, next) {
		try {
			let results = await shoesService.shoesInStock(); 
			res.json({status: 'success', items: results})
		}
		catch (err) {
			next(err);
		}
	};
	async function filteredBySize(req, res, next) {
		try {
			let size = req.params.size
			let results = await shoesService.allSize(size); 
			res.json({status: 'success', items: results})
		}
		catch (err) {
			next(err);
		}
	};
	async function filteredByBrand(req, res, next) {
		try {
			let brand = req.params.brandname
			let results = await shoesService.allBrand(brand); 
			res.json({status: 'success', items: results})
		}
		catch (err) {
			next(err);
		}
	};
	async function filteredByBrandSize(req, res, next) {
		try {
			let brand = req.params.brandname
			let size = req.params.size
			let results = await shoesService.allBrandSize(size,brand); 
			res.json({status: 'success', items: results})
		}
		catch (err) {
			next(err);
		}
	};
	async function addShoe (req, res, next) {
		try {
			let params = req.body;
			await shoesService.addStockItem(params); 
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

	async function sellShoe (req, res, next) {
		try {
			let  = req.params;
			console.log(shoeId);
			
			await shoesService.removeStockItem(params); 
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

	
	return {
		showAll,
		filteredBySize,
		filteredByBrand,
		filteredByBrandSize,
		addShoe,
		sellShoe
	}
}
