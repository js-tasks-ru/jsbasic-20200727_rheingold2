export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if(this.cartItems.includes(product)){
     let duplicateItem = this.cartItems.find( (cartProduct)=>{
       return cartProduct.id === product.id;
      });
      duplicateItem.count++;
    }else{
      product.count = 1;
      this.cartItems.push(product);
    }
    this.onProductUpdate(this.cartItems);
    
  }

  updateProductCount(productId, amount) {
    // ваш код
    let productIndex = this.cartItems.findIndex( (obj)=>{
      return obj.id === productId;
    } );
    if(amount > 0){
      this.cartItems[productIndex].count++;
    }
    if(amount<0){
      this.cartItems[productIndex].count--;

      if(this.cartItems[productIndex].count <=0){
        this.cartItems.splice(productIndex,1);
      }
    }
    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    // ваш код
    if(this.cartItems.length === 0) {return true;}
    return false;
  }

  getTotalCount() {
    // ваш код
    let totalProd = 0;
    this.cartItems.forEach( (prod)=>{
        totalProd += prod.count;
    })
    return totalProd;
  }

  getTotalPrice() {
    // ваш код
    let totalPrice = 0;
    this.cartItems.forEach( (prod)=>{
      totalPrice += prod.price * prod.count;
    })
    return totalPrice;
  }

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

