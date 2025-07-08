"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Download, Settings, User, ArrowLeft } from "lucide-react"

export default function ProfilePage() {
  const [isManagingSubscription, setIsManagingSubscription] = useState(false)

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    subscription: {
      status: "active",
      plan: "Pro",
      nextBilling: "2024-02-15",
      amount: 29.99,
    },
    usage: {
      promptsUsed: 45,
      promptsLimit: 100,
      testsUsed: 12,
      testsLimit: 50,
    },
    purchasedPrompts: [
      {
        id: "1",
        title: "Content Marketing Assistant",
        purchaseDate: "2024-01-10",
        price: 2.99,
        downloads: 5,
      },
      {
        id: "2",
        title: "Code Review Expert",
        purchaseDate: "2024-01-08",
        price: 3.99,
        downloads: 3,
      },
    ],
  }

  const handleManageSubscription = () => {
    setIsManagingSubscription(true)
    setTimeout(() => {
      alert("This would redirect to Stripe Customer Portal in production!")
      setIsManagingSubscription(false)
    }, 1000)
  }

  const usagePercentage = (userData.usage.promptsUsed / userData.usage.promptsLimit) * 100
  const testUsagePercentage = (userData.usage.testsUsed / userData.usage.testsLimit) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your account and subscription</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="purchases">Purchases</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* User Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Account Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <p className="text-gray-900">{userData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">{userData.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Stats */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Prompt Usage</CardTitle>
                    <CardDescription>
                      {userData.usage.promptsUsed} of {userData.usage.promptsLimit} prompts used this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={usagePercentage} className="mb-2" />
                    <p className="text-sm text-gray-600">
                      {userData.usage.promptsLimit - userData.usage.promptsUsed} prompts remaining
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Test Usage</CardTitle>
                    <CardDescription>
                      {userData.usage.testsUsed} of {userData.usage.testsLimit} tests used this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={testUsagePercentage} className="mb-2" />
                    <p className="text-sm text-gray-600">
                      {userData.usage.testsLimit - userData.usage.testsUsed} tests remaining
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Subscription Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Current Plan</h3>
                        <p className="text-gray-600">
                          {userData.subscription.plan} Plan - €{userData.subscription.amount}/month
                        </p>
                      </div>
                      <Badge variant={userData.subscription.status === "active" ? "default" : "secondary"}>
                        {userData.subscription.status}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-medium">Next Billing Date</h3>
                      <p className="text-gray-600">{userData.subscription.nextBilling}</p>
                    </div>

                    <Button
                      onClick={handleManageSubscription}
                      disabled={isManagingSubscription}
                      className="w-full md:w-auto"
                    >
                      {isManagingSubscription ? "Loading..." : "Manage Subscription"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchases" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Purchased Prompts</span>
                  </CardTitle>
                  <CardDescription>Prompts you've purchased and can download anytime</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.purchasedPrompts.map((prompt) => (
                      <div key={prompt.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{prompt.title}</h3>
                          <p className="text-sm text-gray-600">
                            Purchased on {prompt.purchaseDate} • €{prompt.price}
                          </p>
                          <p className="text-xs text-gray-500">Downloaded {prompt.downloads} times</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Account Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline">Update Profile</Button>
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">Email Preferences</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
