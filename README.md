#### **backend-desafio-02**
___
## Manejo de archivos

### **Consigna**

* Realizar una clase de nombre ```ProductManager```, el cual permitirá trabajar con múltiples productos. Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).

### **Aspectos a incluir**

* La clase debe contar con una variable ```this.path```, el cual se inicializará desde el constructor y debe recibir la ruta a trabajar desde el momento de generar su instancia.

* Debe guardar objetos con el siguiente formato:
    - ```id``` (se debe incrementar automáticamente, no enviarse desde el cuerpo)
    - ```title``` (nombre del producto)
    - ```description``` (descripción del producto)
    - ```price``` (precio)
    - ```thumbnail``` (ruta de imagen)
    - ```code``` (código identificador)
    - ```stock``` (número de piezas disponibles)


* Debe tener un método ```addProduct``` el cual debe recibir un objeto con el formato previamente especificado, asignarle un ```id``` autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).

* Debe tener un método ```getProducts```, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.

* Debe tener un método ```getProductById```, el cual debe recibir un ```id```, y tras leer el archivo, debe buscar el producto con el ```id``` especificado y devolverlo en formato ***objeto***.

* Debe tener un método ```updateProduct```, el cual debe recibir el ```id``` del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese ```id``` en el archivo. **NO DEBE BORRARSE SU ID**.

* Debe tener un método ```deleteProduct```, el cual debe recibir un ```id``` y debe eliminar el producto que tenga ese ```id``` en el archivo.

### **Formato del entregable**

* Archivo de javascript con el nombre ```ProductManager.js```

### **Testing**

* Proceso de testing de este entregable [descargue desde aquí](https://docs.google.com/document/d/1DFXV0mj_N8MEjXUv6aVE1KDgncADT4eR4YJ2cb1vFzc/edit#) ✅

### **Entregable**

```js
class ProductManager {
	constructor() {
		this.path = "./files/products.json";
	}

	#writeFile = async (content) => {
		await fs.promises.writeFile(this.path, JSON.stringify(content, null, "\t"));
	};

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

		this.#writeFile(products);
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
			this.#writeFile(products);
			console.log("Product updated!");
			return updatedProduct;
		}
	};

	deleteProduct = async (productId) => {
		const product = await this.getProductById(productId);
		const products = await this.getProducts();
		const newProducts = products.filter((element) => element.id !== productId);
		this.#writeFile(newProducts);

		if (products.length - newProducts.length > 0)
			console.log("Product deleted!");

		return product;
	};
}
```

Por favor, [descargue desde aquí](https://github.com/jmquintana/backend-desafio-02/archive/master.zip) el repo completo.

### **Muchas gracias!**

Made by **José María Quintana** { [josemqu](https://github.com/jmquintana/) } 🤓