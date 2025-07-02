export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  isEmailVerified: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  isActive: boolean;
}

export interface Booking {
  id: string;
  clientId: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentId?: string;
  notes?: string;
  createdAt: string;
}

export interface Gallery {
  id: string;
  title: string;
  description: string;
  category: string;
  images: GalleryImage[];
  isPublished: boolean;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  order: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'responded' | 'closed';
  createdAt: string;
}

export interface TimeSlot {
  date: string;
  time: string;
  isAvailable: boolean;
  serviceId?: string;
}

export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalClients: number;
  pendingBookings: number;
  recentBookings: Booking[];
  revenueByMonth: { month: string; revenue: number }[];
  bookingsByService: { service: string; count: number }[];
}