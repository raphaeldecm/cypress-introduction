"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addProduct } from "../actions/product-actions"

export default function ProductForm() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addProduct({ name, price: Number.parseFloat(price) })
    setName("")
    setPrice("")
    router.refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>
          <Button type="submit">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  )
}

