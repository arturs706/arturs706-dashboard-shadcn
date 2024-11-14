export interface LandlordData {
  landlord_id?: string;
  landlord_type: "private" | "company";
  title?: "mr" | "mrs" | "miss" | "ms" | "dr" | "prof" | "rev" | "other";
  company_name?: string;
  full_name?: string;
  email?: string;
  phone_nr: string;
  status: "active" | "inactive";
  staff_assigned?: string;
  created_at?: string;
  updated_at?: string;
}

export type SortField =
  | "name"
  | "created_at"
  | "updated_at"
  | "email"
  | "phone_nr";
export type SortOrder = "asc" | "desc";
export type StatusFilter = "active" | "inactive" | "all";

export interface FetchParams {
  initial_sort_by?: SortField;
  initial_order?: SortOrder;
  initial_filter?: StatusFilter;
}

export interface ClientComponentProps {
  initialData: LandlordData[];
  refreshData: (params: FetchParams) => Promise<LandlordData[]>;
}
