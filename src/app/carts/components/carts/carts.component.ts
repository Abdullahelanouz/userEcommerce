import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {

  constructor(private service:CartsService) { }
  cartproducts:any[]=[]
  Totlal:any=0;
  success:boolean=false

  ngOnInit(): void {
    this.getCartProducts()

  }


  getCartProducts(){
    if ("cart" in localStorage) {
      this.cartproducts =JSON.parse(localStorage.getItem("cart")!)
  }
 // console.log(this.cartproducts)
 this.getCartTotal()

}
minsAmount(index:number){
  this.cartproducts[index].quantity--

  this.getCartTotal()
  localStorage.setItem("cart",JSON.stringify(this.cartproducts))

}
addAmount(index:number){
 this.cartproducts[index].quantity++

 this.getCartTotal()
 localStorage.setItem("cart",JSON.stringify(this.cartproducts));
}
detectchange(){
  this.getCartTotal()
  localStorage.setItem("cart",JSON.stringify(this.cartproducts));
}
deleteproduct(index:number){
this.cartproducts.splice(index,1)
this.getCartTotal()
localStorage.setItem("cart",JSON.stringify(this.cartproducts));//update localSrtorage
}
clearcart(){
  this.cartproducts=[]
  this.getCartTotal()
localStorage.setItem("cart",JSON.stringify(this.cartproducts));//update localSrtorage
}
getCartTotal(){
this.Totlal =0
for(let x in this.cartproducts){
  this.Totlal +=this.cartproducts[x].item.price * this.cartproducts[x].quantity;
}
}
addCart(){
  let products = this.cartproducts.map(item=>{
    return {productId:item.item.id,quantity:item.quantity}
  })
  let model={
    userId:5,
    data:new Date(),
    products:products

  }
  this.service.createNewCart(model).subscribe(res => {
    this.success =true

  })
  console.log(model)
}

}
