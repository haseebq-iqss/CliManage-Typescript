import { Client } from "./ClientTypes";

export interface Project {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  client?: Client;
}

export type ProjectStatus = "new" | "progress" | "completed";
