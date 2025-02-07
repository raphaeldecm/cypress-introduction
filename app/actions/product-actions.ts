"use server"

let products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
]

export async function getProducts() {
  return products
}

export async function addProduct(product: { name: string; price: number }) {
  const newProduct = {
    id: products.length + 1,
    ...product,
  }
  products.push(newProduct)
  return newProduct
}

export async function updateProduct(id: number, updates: Partial<{ name: string; price: number }>) {
  const index = products.findIndex((p) => p.id === id)
  if (index !== -1) {
    products[index] = { ...products[index], ...updates }
    return products[index]
  }
  return null
}

export async function deleteProduct(id: number) {
  products = products.filter((p) => p.id !== id)
}

