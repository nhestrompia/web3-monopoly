import { SupabaseClient } from "@supabase/supabase-js";

export type TypedSupabaseClient = SupabaseClient;

type User = {
  id: number;
  wallet_address: string;
};

export type Room = {
  id: number;
  created_at: string;
  room_id: string;
  password: string;
  wager: number;
  room_name: string;
  users: User[];
  active: boolean;
};
