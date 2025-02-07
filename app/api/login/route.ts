import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    if (username === "teste" && password === "123") {
      return NextResponse.json({ token: "fake-jwt-token" }, { status: 200 })
    }

    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  } catch {
    return NextResponse.json({ message: "Invalid JSON format" }, { status: 400 })
  }
}
