import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, promptId, testOnly } = await request.json()

    // Mock Stripe checkout session creation
    // In production, you would use the actual Stripe SDK
    const mockSession = {
      id: "cs_test_" + Math.random().toString(36).substr(2, 9),
      url: testOnly
        ? `${process.env.NEXTAUTH_URL}/payment/test-success?session_id=test_session`
        : `${process.env.NEXTAUTH_URL}/payment/success?session_id=purchase_session`,
    }

    // Here you would create actual Stripe session:
    /*
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2022-11-15'
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: testOnly ? 'payment' : 'payment',
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: testOnly ? 'Prompt Test' : 'Prompt Purchase',
          },
          unit_amount: testOnly ? 100 : 299, // €1 for test, €2.99 for purchase
        },
        quantity: 1,
      }],
      success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/prompt/${promptId}?canceled=true`,
      customer_email: email,
      metadata: {
        promptId,
        testOnly: testOnly ? 'true' : 'false'
      }
    })
    */

    return NextResponse.json({ url: mockSession.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
