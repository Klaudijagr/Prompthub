import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, TrendingUp, Zap } from "lucide-react"

export default function HomePage() {
  const featuredPrompts = [
    {
      id: "1",
      title: "Content Marketing Assistant",
      description: "Generate engaging blog posts, social media content, and marketing copy",
      performanceCost: 85,
      author: "AI Marketing Pro",
      rating: 4.8,
      uses: 1250,
      price: 2.99,
    },
    {
      id: "2",
      title: "Code Review Expert",
      description: "Analyze code quality, suggest improvements, and identify potential bugs",
      performanceCost: 92,
      author: "DevTools Master",
      rating: 4.9,
      uses: 890,
      price: 3.99,
    },
    {
      id: "3",
      title: "Creative Writing Coach",
      description: "Help with storytelling, character development, and plot structure",
      performanceCost: 88,
      author: "Story Craft",
      rating: 4.7,
      uses: 2100,
      price: 1.99,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">PromptHub</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Browse
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Create
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Pricing
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Discover Premium AI Prompts</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Test before you buy. Access high-quality, performance-tested prompts for all your AI needs.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input placeholder="Search prompts..." className="pl-10 pr-4 py-3 text-lg" />
          </div>
        </div>
      </section>

      {/* Featured Prompts */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Featured Prompts</h3>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPrompts.map((prompt) => (
              <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{prompt.title}</CardTitle>
                      <CardDescription className="mt-2">{prompt.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-2">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {prompt.performanceCost}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{prompt.rating}</span>
                      <span className="text-sm text-gray-500">({prompt.uses} uses)</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">€{prompt.price}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Test for €1
                    </Button>
                    <Button size="sm" className="flex-1">
                      Buy Now
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">by {prompt.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-3xl font-bold text-blue-600 mb-2">10,000+</h4>
              <p className="text-gray-600">Premium Prompts</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-blue-600 mb-2">50,000+</h4>
              <p className="text-gray-600">Happy Users</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-blue-600 mb-2">95%</h4>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6" />
                <span className="text-xl font-bold">PromptHub</span>
              </div>
              <p className="text-gray-400">The marketplace for premium AI prompts. Test before you buy.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Browse Prompts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Create Prompts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API Docs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PromptHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
