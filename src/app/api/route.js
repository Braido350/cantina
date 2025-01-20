"use server";
"no cache";
import testConnection from "./_services/dbFunctions";


export async function GET(request) {
  const data = await testConnection();
  return new Response(JSON.stringify(data));
}

export async function POST(request) {
  const data = await request.json();
  return new Response(JSON.stringify({ success: true, data }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
