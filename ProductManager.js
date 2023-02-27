import fs from "fs";

export default class ProductManager {
	constructor() {
		this.products = [];
		this.path = "./files/products.json";
	}

	getProducts = async () => {
		if (fs.existsSync(this.path)) {
			const data = await fs.promises.readFile(this.path, "utf-8");
			const result = JSON.parse(data);
			return result;
		} else {
			return [];
		}
	};

	addProduct = async (newProduct) => {
		// const product = {
		// 	title,
		// 	description,
		// 	price,
		// 	thumbnail,
		// 	code,
		// 	stock,
		// };

		const products = await this.getProducts();

		const productIndex = products.findIndex(
			(product) => product.code === newProduct.code
		);

		if (productIndex === -1) {
			if (products.length === 0) {
				newProduct.id = 1;
			} else {
				newProduct.id = products[products.length - 1].id + 1;
			}
			products.push(newProduct);
		} else {
			console.log("Product found!!");
			products[productIndex] = newProduct;
			console.log("Product updated");
		}

		await fs.promises.writeFile(
			this.path,
			JSON.stringify(products, null, "\t")
		);
		return newProduct;
	};

	getProductById = async (productId) => {
		if (fs.existsSync(this.path)) {
			const data = await fs.promises.readFile(this.path, "utf-8");
			const result = JSON.parse(data);
			const productIndex = result.findIndex(
				(product) => product.id === productId
			);

			if (productIndex === -1) {
				// console.error("Product not found");
				return "Product not found";
			} else {
				return result[productIndex];
			}
		} else {
			return [];
		}
	};

	updateProduct = async (productId, newProperties) => {
		const product = await this.getProductById(productId);
		const updatedProduct = {
			...product,
			...newProperties,
			...{ id: productId },
		};
		return this.addProduct(updatedProduct);
	};

	getStock = (productCode) => {
		const productIndex = this.products.findIndex(
			(product) => product.code === productCode
		);

		if (productIndex === -1) {
			return 0;
		} else {
			return this.products[productIndex].stock;
		}
	};
}
