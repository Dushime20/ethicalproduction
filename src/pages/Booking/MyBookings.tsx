import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Eye, 
  Download,
  Filter,
  Search,
  Plus
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';

interface BookingDetails {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentId?: string;
  notes?: string;
  createdAt: string;
}

const MyBookings: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const { user } = useAuth();
  const { services } = useBooking();

  // Mock booking data - in real app, this would come from API filtered by user
  const [userBookings] = useState<BookingDetails[]>([
    {
      id: '1',
      serviceName: 'Wedding Photography',
      date: '2024-02-15',
      time: '10:00',
      duration: 480,
      amount: 2500,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentId: 'pay_1234567890',
      notes: 'Outdoor ceremony, backup indoor location available',
      createdAt: '2024-01-10T10:30:00Z',
    },
    {
      id: '2',
      serviceName: 'Family Portrait',
      date: '2024-02-20',
      time: '14:00',
      duration: 120,
      amount: 300,
      status: 'pending',
      paymentStatus: 'paid',
      paymentId: 'pay_0987654321',
      notes: 'Family of 4, prefer natural lighting',
      createdAt: '2024-01-15T14:20:00Z',
    },
    {
      id: '3',
      serviceName: 'Corporate Headshots',
      date: '2024-01-25',
      time: '09:00',
      duration: 180,
      amount: 600,
      status: 'completed',
      paymentStatus: 'paid',
      paymentId: 'pay_1122334455',
      notes: 'Professional headshots for LinkedIn',
      createdAt: '2024-01-05T09:15:00Z',
    },
  ]);

  const filteredBookings = userBookings.filter(booking => {
    const matchesSearch = booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewBooking = (booking: BookingDetails) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">
            Please sign in to view your bookings.
          </p>
          <Button>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
              <p className="text-gray-600">Track and manage your photography sessions</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button>
                <Link to="/book" className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Booking
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{userBookings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userBookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userBookings.filter(b => b.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${userBookings.reduce((sum, booking) => sum + booking.amount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}>
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'No bookings match your current filters.' 
                : "You haven't made any bookings yet."}
            </p>
            <Button>
              <Link to="/book">Book Your First Session</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {booking.serviceName}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{format(new Date(booking.date), 'MMMM dd, yyyy')}</span>
                          <Clock className="h-4 w-4 ml-4 mr-2" />
                          <span>{booking.time} ({booking.duration} min)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            {booking.paymentStatus}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${booking.amount}</div>
                        <div className="text-sm text-gray-500">
                          Booked {format(new Date(booking.createdAt), 'MMM dd')}
                        </div>
                      </div>
                    </div>
                    
                    {booking.notes && (
                      <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-md">
                        <strong>Notes:</strong> {booking.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-3 mt-4 lg:mt-0 lg:ml-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewBooking(booking)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    
                    {booking.paymentStatus === 'paid' && (
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Booking Modal */}
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Booking Details"
          size="lg"
        >
          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Service Information</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Service:</span>
                      <p className="font-medium">{selectedBooking.serviceName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Duration:</span>
                      <p className="font-medium">{selectedBooking.duration} minutes</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Amount:</span>
                      <p className="font-medium text-lg">${selectedBooking.amount}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Schedule Information</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Date:</span>
                      <p className="font-medium">{format(new Date(selectedBooking.date), 'MMMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Time:</span>
                      <p className="font-medium">{selectedBooking.time}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Booking ID:</span>
                      <p className="font-medium font-mono text-sm">{selectedBooking.id}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedBooking.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Special Requests</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{selectedBooking.notes}</p>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex space-x-2">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                    {selectedBooking.paymentStatus}
                  </span>
                </div>
                
                {selectedBooking.paymentId && (
                  <p className="text-xs text-gray-500">
                    Payment ID: {selectedBooking.paymentId}
                  </p>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                {selectedBooking.paymentStatus === 'paid' && (
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MyBookings;