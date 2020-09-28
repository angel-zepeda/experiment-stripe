This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

# API routes

## Customer endpoints

- Get all customers
```bash
  GET: /api/payments/customers?limit=
```

- Create new customer
```bash
  POST: /api/payments/customers

  [Paylod to create new customer]
  {
    name: string
    email?: string
    description?: string
  }
```
- Get customer by ID

```bash
  GET: /api/payments/customers/:customerId
```
<br>
<br>

## Product endpoints

- Get all products
```bash
  GET: /api/payments/products
```

- Create new product
```bash
  POST /api/v1/payments/products/

  [Payload to create a new product]
  {
    name: string
  }
```

- Get product by ID
```bash
  GET: /api/payments/products/:productId
```

<br>
<br>

## Price endpoints

- Get all prices
```bash
  GET: /api/payments/prices
```
- Create new price
```bash
  POST: /api/payments/prices

  [Payload to create a new price]
  {
    unit_amount: number,
    currency: 'usd' | 'mxn',
    recurring: { 
      interval: 'day' | 'week' | 'month' | 'year',
    },
    product: productId
  }
```
- Get price by ID
```bash
  GET: /api/payments/prices/:priceId
```

<br>
<br>

## Subscriptions

```bash
- priceId[required]

export const createSubscription = async (priceId: string) => {
  const stripe = await stripePromise;
  try {
    await stripe.redirectToCheckout({
      lineItems: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'subscription',
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel'
    });
  } catch (error) {
    console.log(error);
  }
};
```
<br>
<br>

# Customer Payment mehtods
payment methods types: https://stripe.com/docs/api/payment_methods/create#create_payment_method-type
```bash
  GET: /api/payments/payment_methods?customerId=&type=

  type: 'card' | 'alpay' | 'giropay' | 'oxxo' ;
```

<br>
<br>

# Donation

- Create donation
<br>
** This endpoint will create a paymentIntent
<br>
** check this: https://stripe.com/docs/api/payment_intents

```bash
  POST: /api/payments/donations/

 [Payload to create paymentIntent donation]
 {
    amount: amount * 100,  ->  *100 is to convert amount to cents
    currency: 'usd',
    customer: customerId,
    metadata: { // Metadata can be blank
      order_id: uuid
    }
 }
```
<br>
<br>

## Confirm payment Intent
** This endpoint will confirm payement intent to apply the charge
```bash
  GET: /api/payments/payment_confirm?paymentIntentId=&paymentMethodId=
```