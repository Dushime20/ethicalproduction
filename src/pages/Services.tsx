import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Camera, 
  Users, 
  Star, 
  ArrowRight, 
  Check,
  Heart,
  Building,
  Baby,
  Briefcase,
  Gift,
  MapPin,
  Award,
  Zap,
  Shield,
  Calendar
} from 'lucide-react';
import Button from '../components/UI/Button';

const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: Camera },
    { id: 'wedding', name: 'Weddings', icon: Heart },
    { id: 'portrait', name: 'Portraits', icon: Users },
    { id: 'event', name: 'Events', icon: Gift },
    { id: 'commercial', name: 'Commercial', icon: Briefcase },
  ];

  const services = [
    {
      id: 'wedding-premium',
      category: 'wedding',
      name: 'Premium Wedding Package',
      tagline: 'Your perfect day, perfectly captured',
      description: 'Complete wedding day coverage with artistic storytelling, candid moments, and timeless elegance.',
      price: 3500,
      originalPrice: 4000,
      duration: '10 hours',
      popular: true,
      features: [
        'Pre-wedding consultation & planning',
        'Engagement session included',
        'Full day coverage (10 hours)',
        '800+ edited high-resolution photos',
        'Professional second photographer',
        'Online gallery for 2 years',
        'USB drive with all images',
        'Print release included',
        '50-page premium wedding album',
        'Same-day sneak peek (5 photos)',
      ],
      addOns: [
        { name: 'Additional hour', price: 200 },
        { name: 'Drone photography', price: 300 },
        { name: 'Photo booth setup', price: 500 },
      ],
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      gallery: [
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      ],
    },
    {
      id: 'wedding-essential',
      category: 'wedding',
      name: 'Essential Wedding Package',
      tagline: 'Beautiful memories, essential coverage',
      description: 'Perfect for intimate weddings and couples who want professional coverage at an accessible price.',
      price: 2500,
      duration: '8 hours',
      popular: false,
      features: [
        'Pre-wedding consultation',
        'Full day coverage (8 hours)',
        '500+ edited high-resolution photos',
        'Online gallery for 1 year',
        'USB drive with all images',
        'Print release included',
        'Same-day sneak peek (3 photos)',
      ],
      addOns: [
        { name: 'Engagement session', price: 400 },
        { name: 'Additional hour', price: 200 },
        { name: 'Wedding album', price: 600 },
      ],
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      gallery: [
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      ],
    },
    {
      id: 'portrait-family',
      category: 'portrait',
      name: 'Family Portrait Session',
      tagline: 'Capturing your family\'s unique story',
      description: 'Professional family portraits that celebrate your bonds and create lasting memories for generations.',
      price: 400,
      duration: '2 hours',
      popular: true,
      features: [
        '2-hour photo session',
        'Multiple locations (up to 2)',
        'Outfit change assistance',
        '75+ edited photos',
        'Online gallery for 6 months',
        'High-resolution downloads',
        'Print release included',
        'Family styling guide',
      ],
      addOns: [
        { name: 'Additional family member', price: 50 },
        { name: 'Pet inclusion', price: 75 },
        { name: 'Canvas print package', price: 200 },
      ],
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      gallery: [
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      ],
    },
    {
      id: 'portrait-professional',
      category: 'portrait',
      name: 'Professional Headshots',
      tagline: 'Make a powerful first impression',
      description: 'Corporate headshots and professional portraits that showcase your best self for business and personal branding.',
      price: 300,
      duration: '1.5 hours',
      popular: false,
      features: [
        '1.5-hour studio session',
        'Multiple outfit changes',
        'Professional lighting setup',
        '50+ edited photos',
        'LinkedIn-optimized versions',
        'High-resolution downloads',
        'Same-day preview',
        'Retouching included',
      ],
      addOns: [
        { name: 'Additional person', price: 150 },
        { name: 'On-location shoot', price: 200 },
        { name: 'Rush delivery (24h)', price: 100 },
      ],
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      gallery: [
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      ],
    },
    {
      id: 'portrait-maternity',
      category: 'portrait',
      name: 'Maternity & Newborn',
      tagline: 'Celebrating new beginnings',
      description: 'Beautiful maternity and newborn photography that captures the miracle of new life and growing families.',
      price: 450,
      duration: '2.5 hours',
      popular: false,
      features: [
        '2.5-hour session',
        'Maternity and newborn poses',
        'Props and accessories included',
        '100+ edited photos',
        'Online gallery for 1 year',
        'High-resolution downloads',
        'Print release included',
        'Safety-first approach',
      ],
      addOns: [
        { name: 'Partner/sibling inclusion', price: 100 },
        { name: 'Custom photo album', price: 300 },
        { name: 'Birth announcement cards', price: 150 },
      ],
      image: 'https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      gallery: [],
    },
    {
      id: 'event-corporate',
      category: 'event',
      name: 'Corporate Event Coverage',
      tagline: 'Professional events, professionally captured',
      description: 'Comprehensive corporate event photography for conferences, meetings, product launches, and company celebrations.',
      price: 800,
      duration: '4 hours',
      popular: true,
      features: [
        '4-hour event coverage',
        'Candid and posed shots',
        'Speaker and presentation photos',
        '200+ edited photos',
        'Quick turnaround (48 hours)',
        'Online gallery with download codes',
        'Commercial usage rights',
        'Event timeline coordination',
      ],
      addOns: [
        { name: 'Additional hour', price: 150 },
        { name: 'Live photo sharing', price: 200 },
        { name: 'Video highlights reel', price: 500 },
      ],
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      gallery: [
        'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      ],
    },
    {
      id: 'event-party',
      category: 'event',
      name: 'Private Party & Celebration',
      tagline: 'Every celebration deserves to be remembered',
      description: 'Birthday parties, anniversaries, graduations, and special celebrations captured with joy and creativity.',
      price: 600,
      duration: '3 hours',
      popular: false,
      features: [
        '3-hour party coverage',
        'Candid moment capture',
        'Group and individual photos',
        '150+ edited photos',
        'Online gallery for 6 months',
        'High-resolution downloads',
        'Print release included',
        'Fun and unobtrusive style',
      ],
      addOns: [
        { name: 'Photo booth props', price: 100 },
        { name: 'Same-day slideshow', price: 200 },
        { name: 'Custom photo favors', price: 250 },
      ],
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      gallery: [],
    },
    {
      id: 'commercial-product',
      category: 'commercial',
      name: 'Product Photography',
      tagline: 'Make your products irresistible',
      description: 'High-quality product photography for e-commerce, catalogs, and marketing materials that drive sales.',
      price: 600,
      duration: '3 hours',
      popular: true,
      features: [
        'Professional studio setup',
        'Multiple angles and compositions',
        'White background and lifestyle shots',
        '100+ edited photos',
        'Commercial usage rights',
        'High-resolution files',
        'RAW files included',
        'Product styling consultation',
      ],
      addOns: [
        { name: 'Additional product', price: 50 },
        { name: 'Lifestyle setting', price: 200 },
        { name: '360-degree photography', price: 300 },
      ],
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      gallery: [
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      ],
    },
    {
      id: 'commercial-brand',
      category: 'commercial',
      name: 'Brand & Marketing Photography',
      tagline: 'Tell your brand story visually',
      description: 'Custom brand photography for websites, social media, and marketing campaigns that align with your brand identity.',
      price: 1200,
      duration: '5 hours',
      popular: false,
      features: [
        'Brand consultation session',
        '5-hour creative shoot',
        'Multiple concepts and setups',
        '200+ edited photos',
        'Brand style guide alignment',
        'Commercial usage rights',
        'Social media optimized versions',
        'Content calendar suggestions',
      ],
      addOns: [
        { name: 'Additional concept', price: 300 },
        { name: 'Video content creation', price: 800 },
        { name: 'Monthly content retainer', price: 2000 },
      ],
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      gallery: [],
    },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Award-Winning Quality',
      description: 'Recognized excellence in photography with multiple industry awards and certifications.',
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Quick delivery without compromising quality. Most sessions delivered within 2-3 weeks.',
    },
    {
      icon: Shield,
      title: 'Satisfaction Guarantee',
      description: '100% satisfaction guarantee. If you\'re not happy, we\'ll make it right or refund your money.',
    },
    {
      icon: Users,
      title: 'Personal Approach',
      description: 'Every client receives personalized attention and a customized photography experience.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 py-24">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Professional Photography
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Services
            </span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            From intimate moments to grand celebrations, we capture life's most precious memories with artistic vision and professional excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <Link to="/book">Book Your Session</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link to="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="bg-white py-12 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                <category.icon className="h-5 w-5 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {service.popular && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 font-semibold">
                  ⭐ Most Popular Choice
                </div>
              )}
              
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{service.name}</h3>
                  <p className="text-sm opacity-90">{service.tagline}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-600 mr-1" />
                    <span className="text-sm font-medium text-gray-900">{service.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-indigo-600">${service.price}</span>
                      {service.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">${service.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">starting price</p>
                  </div>
                  {service.originalPrice && (
                    <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Save ${service.originalPrice - service.price}
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.slice(0, 6).map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {service.features.length > 6 && (
                      <li className="text-sm text-indigo-600 font-medium">
                        + {service.features.length - 6} more features included
                      </li>
                    )}
                  </ul>
                </div>

                {service.gallery && service.gallery.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Sample Work:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {service.gallery.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${service.name} sample ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {service.addOns && service.addOns.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Popular Add-ons:</h4>
                    <div className="space-y-2">
                      {service.addOns.map((addon, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{addon.name}</span>
                          <span className="font-medium text-indigo-600">+${addon.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  <Button className="flex-1">
                    <Link to="/book" state={{ selectedService: service.id }} className="flex items-center justify-center">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Link to="/contact" className="flex items-center justify-center">
                      Ask Questions
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose PixelPerfect Studios?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just photographers – we're memory makers, story tellers, and moment preservers who are passionate about our craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                  <item.icon className="h-8 w-8 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Simple Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to final delivery, we make the entire experience smooth and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Book Your Session',
                description: 'Choose your service and preferred date through our easy online booking system',
                icon: Calendar,
              },
              {
                step: '02',
                title: 'Consultation',
                description: 'We discuss your vision, style preferences, and session details to ensure perfection',
                icon: Users,
              },
              {
                step: '03',
                title: 'Photo Session',
                description: 'Professional photography session at your chosen location with expert guidance',
                icon: Camera,
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'Receive your beautifully edited photos through our secure online gallery',
                icon: Star,
              },
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <process.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-gray-900 text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                    {process.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-indigo-600 to-indigo-300 transform -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it – hear from some of our happy clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah & Michael Johnson',
                service: 'Wedding Photography',
                content: 'Absolutely incredible work! They captured every moment perfectly and the photos are beyond beautiful. Our wedding album is a treasure we\'ll cherish forever.',
                rating: 5,
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
              },
              {
                name: 'Emily Chen',
                service: 'Family Portrait',
                content: 'The family portrait session was amazing. They made us feel so comfortable and natural. The photos captured our family\'s personality perfectly!',
                rating: 5,
                image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
              },
              {
                name: 'David Wilson',
                service: 'Corporate Event',
                content: 'Professional, creative, and delivered exactly what we needed for our corporate event. The photos were perfect for our marketing materials.',
                rating: 5,
                image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Create Beautiful Memories?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Let's capture your story with the artistry and professionalism it deserves. Book your session today and let us create something magical together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg">
              <Link to="/book" className="flex items-center">
                Book Your Session Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link to="/contact">Get Custom Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;