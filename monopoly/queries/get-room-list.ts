import { TypedSupabaseClient } from "@/lib/types";

export function getRoomList(client: TypedSupabaseClient) {
  return client.from("rooms").select("*").eq("active", true);
}
