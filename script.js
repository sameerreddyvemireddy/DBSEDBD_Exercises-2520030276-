const API_URL = "http://localhost:8089/api/products";


// GET PRODUCTS
function loadProducts() {

    fetch(API_URL)
        .then(response => response.json())
        .then(products => {

            const table = document.getElementById("productTable");

            table.innerHTML = "";

            products.forEach(product => {

                table.innerHTML += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>${product.price}</td>
                        <td>${product.quantity}</td>
                        <td>
                            <button onclick="deleteProduct(${product.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

            });

        })
        .catch(error => {
            console.error("Error:", error);
            alert("Could not connect to Spring Boot");
        });
}


// ADD PRODUCT
function addProduct() {

    const product = {

        name: document.getElementById("name").value,

        description:
            document.getElementById("description").value,

        price:
            document.getElementById("price").value,

        quantity:
            document.getElementById("quantity").value
    };

    fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)

    })
    .then(response => response.json())
    .then(() => {

        alert("Product Added Successfully!");

        loadProducts();

    });

}


// DELETE PRODUCT
function deleteProduct(id) {

    fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    })
    .then(() => {

        alert("Product Deleted!");

        loadProducts();

    });

}


// LOAD PRODUCTS WHEN PAGE OPENS
loadProducts();