export type AdminItem = {
  id: string;
  title: string;
  category: string;
  segment: string;
  size: string;
  condition: string;
  status: "available" | "unavailable";
};
