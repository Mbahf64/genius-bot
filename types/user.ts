export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  phoneNumber?: string;
}

export interface Users {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profile: string;
  joinDate: string;
  lastActive: string;
  status: "Active" | "Inactive";
  isActive: boolean;
  role: string;

  profiles: ProfileData[];
  createdAt: string;
  updatedAt: string;
  firstName?: string;
  lastName?: string;
}

export interface ProfileData {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  selectedColor: string;
  avatar: string;
  booksRead: number;
  initials: string;
}
