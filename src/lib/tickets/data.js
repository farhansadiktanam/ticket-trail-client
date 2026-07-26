////////////////

export const fetchTickets = async (params) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tickets?${params.toString()}`,
      {
        cache: "no-store",
      },
    );
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("fetchTickets failed:", err.cause || err);
    throw err;
  }
};

export const deleteTicket = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tickets/${id}`,
    {
      method: "DELETE",
    },
  );
  return res.json();
};
