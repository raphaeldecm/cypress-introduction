import { getProducts, deleteProduct, updateProduct } from "../actions/product-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function ProductList() {
  const products = await getProducts()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>
              <form className="flex items-center space-x-2">
                <Input type="number" name="price" defaultValue={product.price} className="w-24" min="0" step="0.01" />
                <Button
                  formAction={async (formData: FormData) => {
                    "use server"
                    const price = formData.get("price")
                    await updateProduct(product.id, { price: Number.parseFloat(price as string) })
                  }}
                >
                  Update
                </Button>
                <Button
                  formAction={async () => {
                    "use server"
                    await deleteProduct(product.id)
                  }}
                  variant="destructive"
                >
                  Delete
                </Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

