import ProductList from "../components/product-list"
import ProductForm from "../components/product-form"
import { deleteProduct, getProducts, updateProduct } from "../actions/product-actions"


export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Product Management</h1>
      <ProductForm />
      <ProductList 
        initialProducts={products}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
      />
    </div>
  )
}

