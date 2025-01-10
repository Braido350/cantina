"use server";

export async function GET(request) {
  return new Response(JSON.stringify({ name: "John Doe" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const data = await request.json();
  return new Response(JSON.stringify({ success: true, data }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
