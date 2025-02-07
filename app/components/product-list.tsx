"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

type Product = {
  id: number
  name: string
  price: number
}

type Props = {
  initialProducts: Product[]
  updateProduct: (id: number, updates: Partial<Product>) => Promise<Product | null>
  deleteProduct: (id: number) => Promise<void>
}

export default function ProductList({ initialProducts, updateProduct, deleteProduct }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  async function handleUpdate(id: number, formData: FormData) {
  const price = Number.parseFloat(formData.get("price") as string)
  const updatedProduct = await updateProduct(id, { price })

  if (updatedProduct) {
    setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)))
  }
}
  async function handleDelete(id: number) {
    await deleteProduct(id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }


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
                  onClick={async (event) => {
                    event.preventDefault()
                    const formData = new FormData(event.currentTarget.closest("form") as HTMLFormElement)
                    await handleUpdate(product.id, formData)
                  }}
                >
                  Update
                </Button>
                <Button
                  type="button"
                  onClick={() => handleDelete(product.id)}
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

