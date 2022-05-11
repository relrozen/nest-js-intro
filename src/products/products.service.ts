import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products];
    }

    getProduct(id: string): Product {
        const product = this.findProduct(id)[0];
        return {...product};
    }

    updateProduct(id: string, title: string, description: string, price: number) {
        const [product, prodIndex] = this.findProduct(id);
        const updatedProduct = {...product};
        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[prodIndex] = updatedProduct;
        return null;
    }

    private findProduct(id: string): [Product, number] {
        const prodIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[prodIndex];
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return [product, prodIndex];
    }
}