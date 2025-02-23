import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Carts';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private cart:Cart = this.getCartFromLocalStorage();
private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(food:Food){
    let cartItem = this.cart.items.find(ele=> ele.food.id === food.id)
    if(cartItem)
      return;
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }
  removeFromCart(foodId : string):void{
    this.cart.items = this.cart.items
    .filter(ele => ele.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId : string , quantite:number){
      let cartItem = this.cart.items.find(ele=>ele.food.id === foodId)
      if(!cartItem) return ;

      cartItem.quantity = quantite
      cartItem.price = quantite * cartItem.food.price
      this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage():void{
    this.cart.toatalPrice = this.cart.items.reduce((prev , currentItem)=> prev + currentItem.price , 0);
    this.cart.totalCount = this.cart.items.reduce((prev , currentItem)=> prev + currentItem.quantity , 0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart' , cartJson);

    this.cartSubject.next(this.cart);
  }

  getCartFromLocalStorage():Cart{
    const cartJson =  localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();

  }
}
