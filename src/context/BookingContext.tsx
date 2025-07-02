import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Booking, Service, TimeSlot } from '../types';

interface BookingContextType {
  bookings: Booking[];
  services: Service[];
  availableSlots: TimeSlot[];
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Promise<void>;
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  checkAvailability: (serviceId: string, date: string) => Promise<TimeSlot[]>;
  processPayment: (bookingId: string, paymentData: any) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

// Mock data
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Wedding Photography',
    description: 'Complete wedding day coverage with professional editing',
    price: 2500,
    duration: 480, // 8 hours
    category: 'Wedding',
    isActive: true,
  },
  {
    id: '2',
    name: 'Portrait Session',
    description: 'Professional portrait photography session',
    price: 300,
    duration: 120, // 2 hours
    category: 'Portrait',
    isActive: true,
  },
  {
    id: '3',
    name: 'Event Photography',
    description: 'Corporate and private event photography',
    price: 800,
    duration: 240, // 4 hours
    category: 'Event',
    isActive: true,
  },
  {
    id: '4',
    name: 'Commercial Photography',
    description: 'Product and business photography',
    price: 600,
    duration: 180, // 3 hours
    category: 'Commercial',
    isActive: true,
  },
];

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services] = useState<Service[]>(mockServices);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, ...updates } : booking
      )
    );
  };

  const cancelBooking = async (id: string) => {
    await updateBooking(id, { status: 'cancelled' });
  };

  const checkAvailability = async (serviceId: string, date: string): Promise<TimeSlot[]> => {
    // Mock availability check
    const slots: TimeSlot[] = [];
    const hours = ['09:00', '11:00', '13:00', '15:00', '17:00'];
    
    for (const hour of hours) {
      const isBooked = bookings.some(
        booking => 
          booking.serviceId === serviceId &&
          booking.date === date &&
          booking.time === hour &&
          booking.status !== 'cancelled'
      );
      
      slots.push({
        date,
        time: hour,
        isAvailable: !isBooked,
        serviceId,
      });
    }
    
    setAvailableSlots(slots);
    return slots;
  };

  const processPayment = async (bookingId: string, paymentData: any) => {
    // Mock payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await updateBooking(bookingId, {
      paymentStatus: 'paid',
      paymentId: `pay_${Date.now()}`,
      status: 'confirmed',
    });
  };

  const value = {
    bookings,
    services,
    availableSlots,
    createBooking,
    updateBooking,
    cancelBooking,
    checkAvailability,
    processPayment,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};