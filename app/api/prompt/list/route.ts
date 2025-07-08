import { type NextRequest, NextResponse } from "next/server"

// Mock data - in production this would come from your database
const prompts = [
  {
    id: "1",
    title: "Content Marketing Assistant",
    content: "You are an expert content marketing assistant...",
    performanceCost: 85,
    authorId: "user1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Code Review Expert",
    content: "You are a senior software engineer reviewing code...",
    performanceCost: 92,
    authorId: "user2",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Creative Writing Coach",
    content: "You are a creative writing coach helping with storytelling...",
    performanceCost: 88,
    authorId: "user3",
    createdAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    // Add cache headers
    const response = NextResponse.json(prompts)
    response.headers.set("Cache-Control", "s-maxage=30, stale-while-revalidate")

    return response
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 })
  }
}
