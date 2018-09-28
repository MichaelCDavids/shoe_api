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

  function sellItem(params){
    return axios.post('/api/shoes/sold/:id', params)
  }

  return {
    shoesInStock: getShoes,
    filterBrand: getBrand,
    filterSize: getSize,
    filteredShoes: filterShoes,
    addStockItem: addItem,
    removeStockItem: sellItem
  }
}