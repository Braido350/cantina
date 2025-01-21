"use server";
"no cache";
import { testConnection } from "../../services/dbFunctions";

export async function GET(request) {
  const data = await testConnection();
  return new Response(JSON.stringify(data));
}
