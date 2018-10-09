module.exports = function (shoesService, cartService) {
	async function allShoes(req, res) {
		try {
			let results = await shoesService.getShoes();
			let brands = await shoesService.getBrands();
			let colors = await shoesService.getColors();
			let sizes = await shoesService.getSizes();
			res.json({
				status: 'success',
				items: results,
				brands: brands,
				colors: colors,
				sizes: sizes
			})
		} catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	async function filterByBrand(req, res) {
		try {
			let brand = req.params.brandname
			let results = await shoesService.allBrand(brand);
			res.json({
				status: 'success',
				items: results
			})
		} catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	async function filterByColor(req, res) {
		try {
			let color = req.params.color
			let results = await shoesService.allColor(color);
			res.json({
				status: 'success',
				items: results
			})
		} catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	async function filterBySize(req, res) {
		try {
			let size = req.params.size
			let results = await shoesService.allSize(size);
			res.json({
				status: 'success',
				items: results
			})
		} catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};

	async function filterByBrandSize(req, res) {
		try {
			let brand = req.params.brandname
			let size = req.params.size
			let results = await shoesService.allBrandSize(size, brand);
			res.json({
				status: 'success',
				items: results
			})
		} catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	async function filterByBrandSizeColor(req, res) {
		try {
			let brand = req.params.brandname;
			let size = req.params.size;
			let color = req.params.color;
			let results = await shoesService.allBrandSize(size, brand, color);
			res.json({
				status: 'success',
				items: results
			})
		} catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	async function addShoe(req, res) {
		try {
			let params = req.body;
			await shoesService.addStockItem(params);
			let results = await shoesService.shoesInStock();
			res.json({
				status: 'success',
				items: results
			})
		} catch (err) {

		}
	};
	async function showCart(req, res) {
		try {
			let results = await cartService.cartShoes();
			let sum = await cartService.cartTotal();
			res.json({
				status: 'success',
				items: results,
				sum : sum
			})
		} catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	async function addToCart(req, res) {
		try {
			let shoeID = req.params;
			await cartService.addToCart(shoeID);
			let results = await shoesService.getShoes();
			res.json({
				status: 'success',
				items: results
			})
		} catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	
	async function removeFromCart(req, res) {
		try {
			let shoeID = req.params;
			await cartService.removeFromCart(shoeID.id);
			let results = await cartService.cartShoes();
			console.log(results);
			let sum = await cartService.cartTotal();
			console.log(sum);
			res.json({
				status: 'success',
				items: results,
				sum: sum
			})
		} catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	async function checkout(req, res) {
		try {

			await cartService.checkout()
			let results = await cartService.cartShoes()
			res.json({
				status: 'success',
				items: results
			})
		} catch (err) {
			res.json({
				status: 'error',
				error: err.stack
			})
		}
	};
	return {
		allShoes,

		filterByBrand,
		filterBySize,
		filterByBrandSize,

		addShoe,

		showCart,
		addToCart,
		removeFromCart,
		checkout
	}
}