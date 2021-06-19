import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "./product";
import { ProductService } from "./product.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public products: Product[];
  public product: Product;
  public id: number;
  constructor(private service: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  public getProducts() {
    this.service.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log(this.products);
      },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

  //add product
  public onAddProuct(addForm: NgForm) {
    document.getElementById("add-product-form").click();
    this.service.addProduct(addForm.value).subscribe(
      (response: number) => {
        this.id = response;
        this.getProducts();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  //update product
  public onUpdateProduct(product: Product): void {
    this.service.updateProduct(product).subscribe(
      (response: void) => {
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //delete product
  public onDeleteProduct(productId: number): void {
    this.service.deleteProduct(productId).subscribe(
      (response: void) => this.getProducts(),
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

  //search product

  public searchProduct(key: string): void {
    const result: Product[] = [];
    for (const product of this.products) {
      if (product.prodName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(product);
      }
    }
    this.products = result;
    if (result.length === 0 || !key) {
      this.getProducts();
    }
  }

  //model
  public onOpenModal(product: Product, mode: string): void {
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    if (mode === "add") {
      button.setAttribute("data-target", "#addProductModal");
    }
    if (mode === "edit") {
      this.product = product;
      button.setAttribute("data-target", "#updateProductModal");
    }
    if (mode === "delete") {
      this.product = product;
      button.setAttribute("data-target", "#deleteProductModal");
    }
    container.appendChild(button);
    button.click();
  }
}
