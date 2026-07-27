"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent as CardBody } from "@heroui/react";
import { Receipt } from "lucide-react";

export default function UserPaymentsHistory() {
  const { data: session } = useSession();
  const user = session?.user;

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const getPayments = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/payments/user/${user.id}`,
      );
      const data = await res.json();
      setPayments(data);
      setLoading(false);
    };

    getPayments();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-400 text-sm">Loading transactions…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">Transaction History</h1>

      <Card className="bg-slate-900 border border-white/5">
        <CardBody className="p-0">
          {payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Receipt className="h-10 w-10 text-slate-700 mb-3" />
              <p className="text-white font-semibold">No transactions yet.</p>
              <p className="mt-1 text-sm text-slate-500">
                Your payment history will appear here after booking.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
                    <th className="px-5 py-4 text-left font-medium">
                      Transaction ID
                    </th>
                    <th className="px-5 py-4 text-left font-medium">Ticket</th>
                    <th className="px-5 py-4 text-left font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {payments.map((payment) => (
                    <tr key={payment._id}>
                      <td className="px-5 py-4 font-mono text-xs text-slate-400">
                        {payment.session_id}
                      </td>
                      <td className="px-5 py-4 text-white font-medium">
                        {payment.ticketTitle}
                      </td>
                      <td className="px-5 py-4 font-bold text-green-400">
                        ৳{Number(payment.price).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
