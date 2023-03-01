import ProductManager from "./ProductManager.js";

const manager = new ProductManager();

const test = async () => {
	let firstQuery = await manager.getProducts();
	console.log(firstQuery);

	const product = {
		title: "producto de prueba 2",
		description: "Este es un producto de prueba",
		price: 100,
		thumbnail: "Sin imagen",
		code: "abc123",
		stock: 50,
	};

	let secondQuery = await manager.addProduct(product);
	console.log(secondQuery);

	let thirdQuery = await manager.getProducts();
	console.log(thirdQuery);

	// let forthQuery = await manager.getProductById(1);
	// console.log(forthQuery);

	// let fifthQuery = await manager.getProductById(2);
	// console.log(fifthQuery);

	// let sixthQuery = await manager.updateProduct(1, {
	// 	stock: 50,
	// 	price: 1000,
	// 	thumbnail: "Sin imagen",
	// });
	// console.log(sixthQuery);

	// let sevenQuery = await manager.deleteProduct(1);
	// console.log(sevenQuery);
};

test();
