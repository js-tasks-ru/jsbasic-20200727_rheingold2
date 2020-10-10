import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.createGridElem();
    this.createProductsCards(products);
  }
  createGridElem(){
    this.elem = document.createElement('div');
    this.elem.className = 'products-grid';
    this.elem.insertAdjacentHTML('afterbegin',`
      <div class="products-grid__inner">
      <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
      </div>
    `);
  }
  createProductsCards(products){
    this.productGrid = this.elem.querySelector('.products-grid__inner');
    products.forEach(element => {
      let newProduct = new ProductCard(element);
      this.productGrid.append(newProduct.elem);
    });
  }

  updateFilter(newfilter){
    Object.assign(this.filters, newfilter);
    this.filteredGrid(this.filters, this.products);
  }

  noNutsFilter(products){
    products = products.filter( (productObj)=>{ 
      return productObj['nuts'] === undefined || productObj['nuts'] === false;
    })
    return products;
  }

  vegeterianOnlyFilter(products){
    products = products.filter( (productObj)=>{ 
      return productObj['vegeterian'] !== undefined || productObj['nvegeterian'] === true;
    })
    return products;
  }

  maxSpicinessFilter(products, spicinessLevel){
    products = products.filter( (productObj)=>{ 
      return productObj['spiciness'] !== undefined && productObj['spiciness'] <= spicinessLevel;
    })
    return products;
  } 

  categoryFilter(products, filterCategory){
    products = products.filter( (productObj)=>{ 
      return productObj['category'] === filterCategory;
    })
    return products;
  }

  filteredGrid(filters, products){
    this.productGrid.innerHTML='';
    let objFilters = Object.keys(filters);
    if ( objFilters.includes('noNuts') && filters.noNuts === true ) {
      products = this.noNutsFilter(products);
    }
    if ( objFilters.includes('vegeterianOnly') && filters.vegeterianOnly  === true ) {
      products = this.vegeterianOnlyFilter(products);
    }
    if ( objFilters.includes('maxSpiciness') ) {
      products = this.maxSpicinessFilter(products, filters['maxSpiciness']);
    }
    if ( objFilters.includes('category') && filters['category'].length !== 0) {
      products = this.categoryFilter(products, filters['category']);
    }

    this.createProductsCards(products);
  }
}
