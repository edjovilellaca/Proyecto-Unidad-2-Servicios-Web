# createUser:
{
  "input": {
        "nombreCompleto": "Carlos Mendoza",
        "email": "carlosmendoza@example.com",
        "password": "password123",
        "direccion": "Boulevard Central 456",
        "zipCode": 63123,
        "telefono": "5558765432",
        "tipoUsuario": "cliente",
        "metodoPagoPreferido": ["Debito", "Transferencia"]
    }
}

# updateUser:
{
  "updateUserId2": "6728697335c7edce90f49b10",
  "updateUserInput2": {
    "direccion": "Nueva Calle 789",
    "zipCode": 63124,
    "telefono": "5550987654",
    "metodoPagoPreferido": ["Deposito"]
  }
}

# deleteUser:
{
  "deleteUserId2": "6728697335c7edce90f49b10"
}

# createBrand:
{
  "createBrandInput2": {
    "name": "Toyota",
    "alias": ["toy", "tm"],
    "CountryOrigin": "Japan"
  }
}

# updateBrand:
{
  "updateBrandId2": "67287133171f2a7e705f4ea6",
  "updateBrandInput2": {
    "alias": ["toyotita", "ty"]
  },
}

# deleteBrand:
{
  "deleteBrandId2": "6728723a171f2a7e705f4eb0"
}

# createProduct:
{
  "createProductInput2": {
    "name": "Camry",
    "price": 25000,
    "desc": "Sedan de tamaño mediano de Toyota",
    "category": "Automóvil",
    "quantity": 10,
    "images": ["nara"],
    "brandId": "6728fd79d04308ebc4efcb68",
  }
}

# updateProduct:
{
  "updateProductId2": "672875136a67111428d485a6",
  "updates": {
    "name": "Camry SE",
    "price": 26000,
    "desc": "Versión deportiva del Camry",
    "brandId": "672875136a67111428d485a6",
    "category": "Automóvil"
  }
}

Po Tato:
67370e3dd090b55ed708209c

{  
  "addItemToCartUserId2": "6737779584e3361562cf0bea",
  "addItemToCartInput2": [{
    "productId": "673776d108a4fd4ee8eb3974",
    "quantity": 1
  }]
} 

67370e3dd090b55ed708209c


Mi ID: 6751144abcea96a42f9693f8
Mi carrito: 675114afbcea96a42f9693fa

{  
  "addItemToCartUserId2": "675114afbcea96a42f9693fa",
  "addItemToCartInput2": [{
    "productId": "673776d108a4fd4ee8eb3974",
    "quantity": 1
  }]
} 


{
  "cartId": "675114afbcea96a42f9693fa",
  "updateShCartInput2": {
    "status": "Inactivo"
  }
}

Mi segundo carrito:
675a656777310dc45b4730db

# Agregar a carrito
mutation AddItemToCart($addItemToCartUserId3: ID!, $addItemToCartInput3: [AddToCartInput!]!) {
  addItemToCart(userId: $addItemToCartUserId3, input: $addItemToCartInput3) {
    productos {
      product {
        _id
      }
      quantity
    }
  }
}

# Body 6736d60a263248a8a7aa52f5
{  
  "addItemToCartUserId2": "675a656777310dc45b4730db",
  "addItemToCartInput2": [{
    "productId": "6728fd92d04308ebc4efcb6a",
    "quantity": 1
  }]
} 


# Borrar item
{  
  "removeItemFromCartUserId2": "675a656777310dc45b4730db",
  "productId": "6728fd92d04308ebc4efcb6a"
}


# Falta Buscar todos los carritos de un usuario