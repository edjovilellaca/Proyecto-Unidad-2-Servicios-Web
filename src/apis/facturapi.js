const Facturapi = require('facturapi').default;
const facturapi = new Facturapi('sk_test_dr0ao5D7ZWjxGbvMmApV4vaByZenkQYP82ABpq4LON');

async function createProduct(product){
    const facturapiProduct = {
        ID: product._id,
        description: product.desc,
        product_key: "50202306",
        price: product.price
    };
    return await facturapi.products.create(facturapiProduct);
};

async function createClient(user) {
    const facturapiClient = {
        legal_name: user.nombreCompleto,
        tax_id: user.taxId || "XAXX010101000",  
        tax_system: user.taxSystem || "601",    
        email: user.email,
        address: {
            zip: user.zipCode.toString() || "63000"
        }
    };
    
    return await facturapi.customers.create(facturapiClient);
};

async function deleteProduct(productId) {
    try {
        await facturapi.products.del(productId);
        return true;
    } catch (error) {
        console.error(`Couldn't delete product in Facturapi: ${error.message}`);
        throw new Error("Product could not be deleted in Facturapi.");
    }
}

async function deleteClient(facturapiId) {
    try {
        await facturapi.customers.del(facturapiId);
        return true;
    } catch (error) {
        console.error(`Error whilst deleting client with ID: ${error.message}, in Facturapi`);
        throw new Error("Client could not be deleted in Facturapi.");
    }
}

async function updateClient(facturapiId, updatedData) {
    try {
        return await facturapi.customers.update(facturapiId, updatedData);
    } catch (error) {
        console.error(`Error whilst updating client with ID: ${error.message} in Facturapi`);
        throw new Error("Client could not be updated in Facturapi.");
    }
}

async function updateProduct(facturapiId, updatedData) {
    try {
        return await facturapi.products.update(facturapiId, updatedData);
    } catch (error) {
        console.error(`Error whilst updating product with ID: ${error.message} in Facturapi`);
        throw new Error("Product could not be updated in Facturapi.");
    }
}

async function createReceipt(shCart, facturapiData) {
    try {
        const items = shCart.productos.map(product => ({
            product: product.product._id,
            quantity: product.quantity || 'Errorzaso en la cantidad'
        }));
        return await facturapi.receipts.create({
            payment_form: Facturapi.PaymentForm.DINERO_ELECTRONICO,
            items: items
        }); 
    } catch (error) {
        console.error(`Error whilst creating receipt. ${error.message} in Facturapi`);
        throw new Error("Receipt could not be created in Facturapi.");
    }
}



module.exports = { createProduct, createClient, deleteProduct, deleteClient, updateProduct, updateClient, createReceipt };


/* 
{  
  "cartId": "6737779584e3361562cf0bea",
  "updateShCartInput2": {
    "status": "Inactivo"
  }
}
*/