import fetch from "node-fetch";

export async function fetchUserData(email: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-actions/get-user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailID: email,
      }),
    }
  );

  const data = await response.json();
  return data;
}
