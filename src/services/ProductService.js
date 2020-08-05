import httpService from './httpService'
const convert = require('xml-js');

async function loadProducts(filterBy) {
  const queryParams = new URLSearchParams();
  if(filterBy){
    queryParams.append('term', filterBy.term)
    queryParams.append('limit', filterBy.limit)
    queryParams.append('page', filterBy.page)
  }
  // get products
  const results = await httpService.get(`product?${queryParams}`)
  return results
}

async function updateProducts(file) {
  // declare a new FileReder
  const reader = new FileReader();
  // read file as text
  reader.readAsText(file);

  //after finish reading
  reader.onload = async (ev) => {
    const readerData = ev.target.result;
    // convert the xml file to a javascript object
    var xmlObj = convert.xml2js(readerData, {compact: true, textKey: '#text', 
    textFn: (val) => { 
      const regex = /'/gi;
     return val.replace(regex, '"')
    }, ignoreDeclaration: true , spaces: 4});

     const updatedProducts = await httpService.post('product', {xmlObj});
    return updatedProducts
  } 
  reader.onerror = () => {
    console.log('ERROR');
    return
  }
}


export default {
  loadProducts,
  updateProducts
}