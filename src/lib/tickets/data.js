////////////////

export const fetchTickets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tickets`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data || [];
};
