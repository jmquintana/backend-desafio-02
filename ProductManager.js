import fs from "fs";

export default class ProductManager {
	constructor() {
		this.products = [];
		this.path = "./files/products.json";
	}

	getProducts = async () => {
		if (!fs.existsSync(this.path)) return [];
		try {
			const data = await fs.promises.readFile(this.path, "utf-8");
			const result = JSON.parse(data);
			return result;
		} catch (error) {
			console.log(`Error reading file. ${error}`);
			return [];
		}
	};

	addProduct = async (newProduct) => {
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
			console.log("Product already exist! You may update it.");
			return;
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
				console.error("Product not found.");
				return;
			} else {
				return result[productIndex];
			}
		} else {
			return [];
		}
	};

	updateProduct = async (productId, newProperties) => {
		const product = await this.getProductById(productId);
		const products = await this.getProducts();
		if (!product) {
			return;
		} else {
			const updatedProduct = {
				...product,
				...newProperties,
			};
			updatedProduct.id = productId;
			const productIndex = products.findIndex(
				(product) => product.id === productId
			);
			products[productIndex] = updatedProduct;
			await fs.promises.writeFile(
				this.path,
				JSON.stringify(products, null, "\t")
			);
			console.log("Product updated!");
			return updatedProduct;
		}
	};

	deleteProduct = async (productId) => {
		const product = await this.getProductById(productId);
		const products = await this.getProducts();
		const newProducts = products.filter((element) => element.id !== productId);
		await fs.promises.writeFile(
			this.path,
			JSON.stringify(newProducts, null, "\t")
		);

		if (products.length - newProducts.length === 1) {
			console.log("Product deleted!");
		}
		return product;
	};
}
