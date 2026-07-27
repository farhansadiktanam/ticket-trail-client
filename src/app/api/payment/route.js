import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { getUser } from "@/lib/api/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const formData = await request.formData();
    const user = await getUser();

    const price = formData.get("price");
    const ticketTitle = formData.get("ticketTitle");
    const ticketId = formData.get("ticketId");
    const userId = user?.id;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: ticketTitle },
            unit_amount: Number(price) * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        ticketId,
        ticketTitle,
        price,
      },
      mode: "payment",
      success_url: `${origin}/pricing/success-payment?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
