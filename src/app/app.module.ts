import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CartsModule,
    ProductsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
