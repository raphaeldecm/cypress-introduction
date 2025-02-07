import ProductList from "../components/product-list"
import ProductForm from "../components/product-form"

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Product Management</h1>
      <ProductForm />
      <ProductList />
    </div>
  )
}

