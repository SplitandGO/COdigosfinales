import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripePublishableKey || !stripeSecretKey) {
  throw new Error('Faltan las variables de entorno de Stripe')
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16'
})

export const stripePromise = loadStripe(stripePublishableKey)

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Stripe usa centavos
    currency,
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return paymentIntent
}

export const createSubscription = async (
  customerId: string,
  priceId: string,
  metadata: Record<string, string> = {}
) => {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    metadata,
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  })

  return subscription
}

export const cancelSubscription = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.cancel(subscriptionId)
  return subscription
}

export const getCustomerSubscriptions = async (customerId: string) => {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    expand: ['data.default_payment_method'],
  })

  return subscriptions
}

export const getSubscription = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['customer', 'default_payment_method'],
  })

  return subscription
}

export type PaymentIntent = {
  id: string
  amount: number
  currency: string
  status: 'succeeded' | 'processing' | 'requires_payment_method'
  client_secret: string
}

export type PaymentMethod = {
  id: string
  type: 'card' | 'apple_pay' | 'google_pay'
  card?: {
    brand: string
    last4: string
    exp_month: number
    exp_year: number
  }
} 