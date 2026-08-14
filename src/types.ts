export interface Milestone {
  id: string;
  milestone: string;
  date: string;
  status: "completed" | "active" | "upcoming";
  description?: string;
}

export interface ContactPerson {
  id: string;
  role: "Faculty" | "Student";
  name: string;
  phone: string;
}

export interface TrackInfo {
  id: string;
  title: string;
  code: string;
  description: string;
  keywords: string[];
  specs: string[];
}
