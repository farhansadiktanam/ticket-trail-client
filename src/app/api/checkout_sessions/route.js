import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { getUser } from "@/lib/api/session";
import { metadata } from "@/app/layout";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const PRICE_ID = "prod_UvPr12Agaxmt7o";
    const user = await getUser();

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        priceId: PRICE_ID,
        userId: user?.id,
        userEmail: user?.email,
      },

      mode: "subscription",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
