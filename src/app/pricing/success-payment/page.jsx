import { payment } from "@/lib/server";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Ticket,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const {
    metadata,
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    // Process payment in your database
    const pay_data = await payment({ ...metadata, session_id });

    return (
      <main className="min-h-[85vh] flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl text-center space-y-6 relative overflow-hidden">
          {/* Subtle Glow Accent */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
            <CheckCircle2 className="w-10 h-10 animate-in zoom-in-50 duration-300" />
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Thank you for your purchase. Your booking has been confirmed.
            </p>
          </div>

          {/* Order Summary Box */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 text-left space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800/80">
              <span>Transaction ID</span>
              <span
                className="font-mono text-slate-300 truncate max-w-50"
                title={session_id}
              >
                {session_id.slice(0, 18)}...
              </span>
            </div>

            {metadata?.ticketTitle && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Item</span>
                <span className="font-semibold text-slate-200">
                  {metadata.ticketTitle}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Confirmation Sent To</span>
              <span className="font-medium text-emerald-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {customerEmail}
              </span>
            </div>
          </div>

          {/* Reassurance Note */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              A digital ticket copy and receipt have been emailed to you.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard/user/booked-tickets"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <Ticket className="w-4 h-4" />
              View My Tickets
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 font-medium text-sm border border-slate-700/50 transition-all active:scale-95"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Support Link */}
          <p className="text-xs text-slate-500 pt-2">
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="text-indigo-400 hover:underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </main>
    );
  }

  return redirect("/");
}
