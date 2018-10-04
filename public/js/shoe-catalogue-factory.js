function ShoeCatalogue() {
  function getShoes() {
    return axios.get('/api/shoes');
  }
  function getBrand(brand) {
    return axios.get(`/api/shoes/brand/${brand}`);
  }
  function getSize(size) {
    return axios.get(`/api/shoes/size/${size}`);
  }
  function filterShoes(size, brand) {
    return axios.get(`/api/shoes/brand/${brand}/size/${size}`);
  }
  function addItem(params){
    return axios.post('/api/shoes/add', params)
  }
  function addCartItem(id){
    return axios.post(`/api/shoes/sold/${id}`)
  }
  function getCart() {
    return axios.get('/api/shoes/cart');
  }

  function removeFromCart(id){
    return axios.post(`api/shoes/cart/remove/${id}`)
  }
  function checkout(){
    return axios.post(`api/shoes/cart/checkout`)
  }

  return {
    shoesInStock: getShoes,
    filterBrand: getBrand,
    filterSize: getSize,
    filteredShoes: filterShoes,
    addStockItem: addItem,
    addItemToCart: addCartItem,
    shoesInCart: getCart,
    removeFromCart,
    checkout
  }
}