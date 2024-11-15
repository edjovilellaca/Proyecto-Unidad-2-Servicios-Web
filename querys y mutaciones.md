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



{
  "createShCartInput": {
    "user": [{
      "id": "6728697335c7edce90f49b10",
      "email": "carlosmendoza@example.com"
      }],
    "productos": [
      {
        "id":"672875136a67111428d485a6",
        "name": "Camry SE 2018",
        "cantidad": "2",
        "brandId": "67287304171f2a7e705f4eb4",
        "price": "246700"
      },
      {
        "id":"672865136a65112428d485a6",
        "name": "Matrix XR 2005",
        "cantidad": "3",
        "brandId": "672873a417132a7e775f4eb4",
        "price": "80000"
      },
      {
        "id":"672871136a6a1114285485a6",
        "name": "GR86 2025",
        "cantidad": "1",
        "brandId": "97287314171f3a7e405f4eb4",
        "price": "767700"
      }
    ],
    "subtotal": 1747800,
    "total": 2027448
  }
}