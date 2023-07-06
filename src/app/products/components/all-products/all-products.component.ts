import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { product } from '../../models/products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products:product[]=[];
  categories:string[]=[];
  loading:boolean=false;
  cartproducts:any[]=[]

  constructor(private service:ProductsService) { }

  ngOnInit(): void {
    this.getproducts()
    this.getcategories()
  }

  getproducts(){
    this.loading=true
    this.service.getAllproducts().subscribe((res:any)=>{
      // console.log(res)
    this.products=res
    this.loading=false
    },error => {
      console.log(error.message)
      this.loading=false
    }
    )
  }

  getcategories(){
    this.loading=true
    this.service.getAllcategories().subscribe((res:any)=>{
    this.categories=res
    this.loading=false
    },error => {
      console.log(error.message)
      this.loading=false
    }
    )
  }
  filtercategory(event:any){
    let value = event.target.value;
   // console.log(value);
   (value=="all")? this.getproducts() : this.getproductsCategory(value)

  }
  getproductsCategory(keyword:string){
    this.loading=true
    this.service.getproductsByCategory(keyword).subscribe((res:any)=>{
      this.loading=false
     this.products =res
    })
  }

  addToCart(event:any) {
    // console.log(event)
    // JSON.stringify() //send Data
    // JSON.parse() //recive Data
    if ("cart" in localStorage) {
      this.cartproducts =JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartproducts.find(item=>item.item.id==event.item.id)
      if(exist) {
        alert("products is already in your cart")
      } else {
        this.cartproducts.push(event)
        localStorage.setItem("cart",JSON.stringify(this.cartproducts))
      }

    } else {
      this.cartproducts.push(event)
      localStorage.setItem("cart",JSON.stringify(this.cartproducts))
    }

    // localStorage.setItem("cart",JSON.stringify(event))
  }


}
