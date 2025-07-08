"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, TrendingUp, User, Calendar, TestTube, CreditCard, ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function PromptDetailPage() {
  const [testInput, setTestInput] = useState("")
  const [testResult, setTestResult] = useState("")
  const [isTestLoading, setIsTestLoading] = useState(false)
  const [showTestModal, setShowTestModal] = useState(false)
  const [progress, setProgress] = useState(0)

  // Mock prompt data
  const promptData = {
    id: "1",
    title: "Content Marketing Assistant",
    description:
      "Generate engaging blog posts, social media content, and marketing copy that converts. This prompt has been optimized for maximum engagement and conversion rates.",
    content:
      "You are an expert content marketing assistant. Create compelling {content_type} about {topic} for {target_audience}. Focus on {key_objectives} and maintain a {tone} tone. Include relevant hashtags and call-to-action.",
    performanceCost: 85,
    author: "AI Marketing Pro",
    authorVerified: true,
    rating: 4.8,
    uses: 1250,
    price: 2.99,
    createdAt: "2024-01-15",
    tags: ["Marketing", "Content", "Social Media", "Copywriting"],
    examples: [
      {
        input: "Blog post about sustainable fashion for millennials",
        output: "🌱 The Future of Fashion is Green: Why Millennials Are Leading the Sustainable Style Revolution...",
      },
    ],
  }

  async function runTestCall(id: string, text: string) {
    setProgress(10) // Initial progress

    try {
      const res = await fetch("/api/prompt/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ promptId: id, inputText: text }),
      })

      setProgress(50) // Halfway through

      if (!res.ok) {
        throw new Error("Failed to test prompt")
      }

      const data = await res.json()
      setProgress(100) // Complete

      return data.result
    } catch (error) {
      setProgress(0) // Reset on error
      throw error
    }
  }

  const handleTestPrompt = async () => {
    setIsTestLoading(true)
    setProgress(0)

    try {
      const result = await runTestCall(promptData.id, testInput)
      setTestResult(result)
    } catch (error) {
      console.error("Test failed:", error)
      setTestResult("Error: Failed to test prompt. Please try again.")
    } finally {
      setIsTestLoading(false)
      // Keep progress at 100 for a moment, then reset
      setTimeout(() => setProgress(0), 2000)
    }
  }

  const handlePurchase = () => {
    alert("Purchase functionality would redirect to Stripe checkout in production!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{promptData.title}</CardTitle>
                    <CardDescription className="text-base">{promptData.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {promptData.performanceCost}% Performance
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{promptData.author}</span>
                    {promptData.authorVerified && (
                      <Badge variant="outline" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{promptData.rating}</span>
                    <span className="text-gray-500">({promptData.uses} uses)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">{promptData.createdAt}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Prompt Content */}
            <Card>
              <CardHeader>
                <CardTitle>Prompt Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">{promptData.content}</div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {promptData.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Example Usage</CardTitle>
              </CardHeader>
              <CardContent>
                {promptData.examples.map((example, index) => (
                  <div key={index} className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Input:</Label>
                      <p className="text-sm bg-blue-50 p-3 rounded mt-1">{example.input}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Output:</Label>
                      <p className="text-sm bg-green-50 p-3 rounded mt-1">{example.output}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Get This Prompt</span>
                  <span className="text-2xl font-bold text-blue-600">€{promptData.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={showTestModal} onOpenChange={setShowTestModal}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      <TestTube className="h-4 w-4 mr-2" />
                      Test for €1
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Test Prompt</DialogTitle>
                      <DialogDescription>
                        Try this prompt with your own input for just €1 before purchasing.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="test-input">Your Input</Label>
                        <Textarea
                          id="test-input"
                          placeholder="Enter your test input here..."
                          value={testInput}
                          onChange={(e) => setTestInput(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      {/* Progress Bar */}
                      {isTestLoading && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Processing your request...</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="w-full" />
                        </div>
                      )}

                      {testResult && (
                        <div>
                          <Label>AI Response</Label>
                          <div className="bg-green-50 p-4 rounded-lg mt-1 whitespace-pre-wrap max-h-60 overflow-y-auto">
                            {testResult}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button onClick={handleTestPrompt} disabled={!testInput || isTestLoading} className="flex-1">
                          {isTestLoading ? (
                            <div className="flex items-center space-x-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Testing...</span>
                            </div>
                          ) : (
                            "Test for €1"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowTestModal(false)
                            setProgress(0)
                            setTestResult("")
                          }}
                          disabled={isTestLoading}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button onClick={handlePurchase} className="w-full" size="lg">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Buy Now - €{promptData.price}
                </Button>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>✓ Instant download</p>
                  <p>✓ Commercial license included</p>
                  <p>✓ 30-day money-back guarantee</p>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium">{promptData.performanceCost}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Uses</span>
                  <span className="font-medium">{promptData.uses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-medium">{promptData.rating}/5.0</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
