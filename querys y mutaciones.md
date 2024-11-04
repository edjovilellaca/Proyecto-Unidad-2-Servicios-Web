# createUser:
{
  "input": {
        "nombreCompleto": "Carlos Mendoza",
        "email": "carlosmendoza@example.com",
        "password": "password123",
        "direccion": "Boulevard Central 456",
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
    "brandId": "67287304171f2a7e705f4eb4",
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
