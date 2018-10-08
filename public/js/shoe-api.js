function ShoeCatalogue() {
  function stockShoes() {
    return axios.get('/api/shoes');
  };
  function stockBrands(brand) {
    return axios.get(`/api/shoes/brand/${brand}`);
  };
  function stockSizes(size) {
    return axios.get(`/api/shoes/size/${size}`);
  };
  function stockColors(color){
    return axios.get(`/api/shoes/color/${color}`)
  };
  function filterBrand(brand){
    return axios.get(`/api/shoes/brand/${brand}`);
  };
  function filterSize(size){
    return axios.get(`/api/shoes/size/${size}`);
  };
  function filterColor(color){
    return axios.get(`/api/shoes/color/${color}`);
  };
  function filterSizeColor(color, size){
    return axios.get(`/api/shoes/size/${size}/color/${color}`);
  }
  function filterBrandSize(brand, size) {
    return axios.get(`/api/shoes/brand/${brand}/size/${size}`);
  };
  function filterAll(brand, size, color){
    return axios.get(`/api/shoes/brand/${brand}/size/${size}/color/${color}`);
  }
  function addItem(params){
    return axios.post('/api/shoes/add', params)
  };
  function addItemToCart(id){
    return axios.post(`/api/shoes/sold/${id}`)
  };
  function cartShoes() {
    return axios.get('/api/shoes/cart');
  };
  function removeFromCart(id){
    return axios.post(`api/shoes/cart/remove/${id}`)
  };
  function checkout(){
    return axios.post(`api/shoes/cart/checkout`)
  };
  return {
    filterBrand,
    filterSize,
    filterColor,
    filterSizeColor,
    filterBrandSize,,
    filterAll,

    stockShoes,
    stockBrands,
    stockSizes,
    stockColors,


    filterShoes,
    addItem,
    addItemToCart,
    cartShoes,
    removeFromCart,
    checkout
  };
};