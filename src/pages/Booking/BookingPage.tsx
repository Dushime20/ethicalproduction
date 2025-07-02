import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CreditCard,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { format, addDays, isSameDay, isAfter, isBefore } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';

interface BookingForm {
  serviceId: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  specialRequests?: string;
}

interface PaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

const BookingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const { user } = useAuth();
  const { services, createBooking, checkAvailability, processPayment } = useBooking();
  const location = useLocation();
  const navigate = useNavigate();

  const preSelectedService = location.state?.selectedService;

  const {
    register: registerBooking,
    handleSubmit: handleBookingSubmit,
    formState: { errors: bookingErrors },
    setValue: setBookingValue,
    watch: watchBooking,
  } = useForm<BookingForm>();

  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors },
    reset: resetPayment,
  } = useForm<PaymentForm>();

  const watchedServiceId = watchBooking('serviceId');
  const watchedDate = watchBooking('date');

  useEffect(() => {
    if (preSelectedService) {
      setSelectedService(preSelectedService);
      setBookingValue('serviceId', preSelectedService);
    }
  }, [preSelectedService, setBookingValue]);

  useEffect(() => {
    if (user) {
      setBookingValue('clientName', user.name);
      setBookingValue('clientEmail', user.email);
    }
  }, [user, setBookingValue]);

  useEffect(() => {
    if (watchedServiceId && watchedDate) {
      checkTimeSlots(watchedServiceId, watchedDate);
    }
  }, [watchedServiceId, watchedDate]);

  const checkTimeSlots = async (serviceId: string, date: string) => {
    setIsCheckingAvailability(true);
    try {
      const slots = await checkAvailability(serviceId, date);
      const availableTimes = slots
        .filter(slot => slot.isAvailable)
        .map(slot => slot.time);
      setAvailableSlots(availableTimes);
    } catch (error) {
      console.error('Error checking availability:', error);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = addDays(today, i);
      dates.push(date);
    }
    return dates;
  };

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const selectedServiceData = services.find(s => s.id === selectedService);

  const onBookingSubmit = (data: BookingForm) => {
    setSelectedDate(data.date);
    setSelectedTime(data.time);
    setCurrentStep(2);
  };

  const handlePaymentProcess = async (paymentData: PaymentForm) => {
    if (!user || !selectedServiceData) return;

    setIsProcessingPayment(true);
    try {
      // Create booking first
      const bookingData = {
        clientId: user.id,
        serviceId: selectedService,
        date: selectedDate,
        time: selectedTime,
        status: 'pending' as const,
        totalAmount: selectedServiceData.price,
        paymentStatus: 'pending' as const,
        notes: watchBooking('specialRequests') || '',
      };

      await createBooking(bookingData);

      // Process payment
      await processPayment('temp-booking-id', paymentData);

      setBookingComplete(true);
      setPaymentModalOpen(false);
      setCurrentStep(3);
    } catch (error) {
      console.error('Payment processing failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const steps = [
    { number: 1, title: 'Select Service & Time', description: 'Choose your preferred service and available time slot' },
    { number: 2, title: 'Review & Payment', description: 'Review your booking details and complete payment' },
    { number: 3, title: 'Confirmation', description: 'Booking confirmed and receipt sent' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">
            You need to be signed in to book a photography session.
          </p>
          <Button onClick={() => navigate('/login')}>
            Sign In to Continue
          </Button>
        </div>
      </div>
    );
  }

  if (!user.isEmailVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verification Required</h2>
          <p className="text-gray-600 mb-6">
            Please verify your email address before booking a session.
          </p>
          <Button onClick={() => navigate('/verify-email')}>
            Verify Email
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Session</h1>
          <p className="text-gray-600">Schedule your photography session in just a few steps</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <span className="text-sm font-medium">{step.number}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-indigo-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-6 ${
                    currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleBookingSubmit(onBookingSubmit)} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Service *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedService === service.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => {
                        setSelectedService(service.id);
                        setBookingValue('serviceId', service.id);
                      }}
                    >
                      <input
                        type="radio"
                        value={service.id}
                        {...registerBooking('serviceId', { required: 'Please select a service' })}
                        className="sr-only"
                      />
                      <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-indigo-600">${service.price}</span>
                        <span className="text-sm text-gray-500">{service.duration} min</span>
                      </div>
                    </div>
                  ))}
                </div>
                {bookingErrors.serviceId && (
                  <p className="mt-2 text-sm text-red-600">{bookingErrors.serviceId.message}</p>
                )}
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Date *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {generateDateOptions().slice(0, 10).map((date) => (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => {
                        const dateStr = format(date, 'yyyy-MM-dd');
                        setSelectedDate(dateStr);
                        setBookingValue('date', dateStr);
                      }}
                      className={`p-3 text-center border rounded-lg transition-colors ${
                        selectedDate === format(date, 'yyyy-MM-dd')
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-sm font-medium">{format(date, 'MMM dd')}</div>
                      <div className="text-xs text-gray-500">{format(date, 'EEEE')}</div>
                    </button>
                  ))}
                </div>
                <input
                  type="hidden"
                  {...registerBooking('date', { required: 'Please select a date' })}
                />
                {bookingErrors.date && (
                  <p className="mt-2 text-sm text-red-600">{bookingErrors.date.message}</p>
                )}
              </div>

              {/* Time Selection */}
              {selectedDate && selectedService && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Time *
                  </label>
                  {isCheckingAvailability ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                      <span className="ml-2 text-gray-600">Checking availability...</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {timeSlots.map((time) => {
                        const isAvailable = availableSlots.includes(time);
                        return (
                          <button
                            key={time}
                            type="button"
                            disabled={!isAvailable}
                            onClick={() => {
                              setSelectedTime(time);
                              setBookingValue('time', time);
                            }}
                            className={`p-3 text-center border rounded-lg transition-colors ${
                              !isAvailable
                                ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                : selectedTime === time
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <Clock className="h-4 w-4 mx-auto mb-1" />
                            <div className="text-sm font-medium">{time}</div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <input
                    type="hidden"
                    {...registerBooking('time', { required: 'Please select a time' })}
                  />
                  {bookingErrors.time && (
                    <p className="mt-2 text-sm text-red-600">{bookingErrors.time.message}</p>
                  )}
                </div>
              )}

              {/* Client Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...registerBooking('clientName', { required: 'Name is required' })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                    <User className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                  {bookingErrors.clientName && (
                    <p className="mt-1 text-sm text-red-600">{bookingErrors.clientName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      {...registerBooking('clientEmail', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                    <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                  {bookingErrors.clientEmail && (
                    <p className="mt-1 text-sm text-red-600">{bookingErrors.clientEmail.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    {...registerBooking('clientPhone', { required: 'Phone number is required' })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                  <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
                {bookingErrors.clientPhone && (
                  <p className="mt-1 text-sm text-red-600">{bookingErrors.clientPhone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  {...registerBooking('specialRequests')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Any special requests or notes for your session..."
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg" className="flex items-center">
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Review & Payment */}
        {currentStep === 2 && selectedServiceData && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Booking</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{selectedServiceData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{format(new Date(selectedDate), 'MMMM dd, yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{selectedServiceData.duration} minutes</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-indigo-600">${selectedServiceData.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Your payment will be processed securely. You will receive a confirmation email once the payment is complete.
                  </p>
                  
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="flex-1"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Edit
                    </Button>
                    <Button
                      onClick={() => setPaymentModalOpen(true)}
                      className="flex-1"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && bookingComplete && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Your photography session has been successfully booked and paid for.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{selectedServiceData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">
                    {format(new Date(selectedDate), 'MMMM dd, yyyy')} at {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium text-green-600">${selectedServiceData?.price}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                A confirmation email has been sent to your email address with all the details.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/')} variant="outline">
                  Back to Home
                </Button>
                <Button onClick={() => navigate('/bookings')}>
                  View My Bookings
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title="Complete Payment"
        size="md"
      >
        <form onSubmit={handlePaymentSubmit(handlePaymentProcess)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number *
            </label>
            <input
              type="text"
              {...registerPayment('cardNumber', { 
                required: 'Card number is required',
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: 'Please enter a valid 16-digit card number',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="1234 5678 9012 3456"
              maxLength={16}
            />
            {paymentErrors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{paymentErrors.cardNumber.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="text"
                {...registerPayment('expiryDate', { 
                  required: 'Expiry date is required',
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                    message: 'Please enter MM/YY format',
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="MM/YY"
                maxLength={5}
              />
              {paymentErrors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{paymentErrors.expiryDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV *
              </label>
              <input
                type="text"
                {...registerPayment('cvv', { 
                  required: 'CVV is required',
                  pattern: {
                    value: /^[0-9]{3,4}$/,
                    message: 'Please enter a valid CVV',
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="123"
                maxLength={4}
              />
              {paymentErrors.cvv && (
                <p className="mt-1 text-sm text-red-600">{paymentErrors.cvv.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name *
            </label>
            <input
              type="text"
              {...registerPayment('cardholderName', { required: 'Cardholder name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="John Doe"
            />
            {paymentErrors.cardholderName && (
              <p className="mt-1 text-sm text-red-600">{paymentErrors.cardholderName.message}</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-indigo-600">${selectedServiceData?.price}</span>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPaymentModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isProcessingPayment}
              className="flex-1"
            >
              Complete Payment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BookingPage;