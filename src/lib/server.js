export const getUsers = async (sParams) => {
  const searchQuery = await sParams;
  const page = searchQuery.page || 1;
  const limit = searchQuery.limit || 3;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users?page=${page}&limit=${limit}`,
  );
  const data = await res.json();
  return data || [];
};
export const getBooking = async (sParams) => {
  const searchQuery = await sParams;
  const page = searchQuery.page || 1;
  const limit = searchQuery.limit || 6;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings?page=${page}&limit=${limit}`,
  );
  return res.json() || [];
};

export const payment = async (data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
};
