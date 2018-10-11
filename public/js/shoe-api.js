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
  function filterBrandColor(brand, color){
    return axios.get(`/api/shoes/brand/${brand}/color/${color}`);
  }
  function filterBrandSize(brand, size) {
    return axios.get(`/api/shoes/brand/${brand}/size/${size}`);
  };
  function filterColorSize(color, size){
    return axios.get(`/api/shoes/color/${color}/size/${size}`);
  };
  function filterAll(brand, color, size){
    return axios.get(`/api/shoes/brand/${brand}/color/${color}/size/${size}`);
  };
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
    filterBrandSize,

    stockShoes,
    stockBrands,
    stockSizes,
    stockColors,
    
    filterBrand,
    filterSize,
    filterColor,

    filterBrandColor,
    filterBrandSize,
    filterColorSize,
    
    filterAll,

    addItem,

    addItemToCart,
    cartShoes,
    removeFromCart,
    checkout
  };
};