import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "./product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  //get all products
  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/all`);
  }

  //add product
  public addProduct(product: Product): Observable<number> {
    return this.httpClient.post<number>(`${this.apiUrl}/save`, product);
  }

  //update product
  public updateProduct(product: Product): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/update`, product);
  }

  //delete product
  public deleteProduct(productId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/delete/${productId}`);
  }
}
