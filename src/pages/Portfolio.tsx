import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'wedding', name: 'Weddings' },
    { id: 'portrait', name: 'Portraits' },
    { id: 'event', name: 'Events' },
    { id: 'commercial', name: 'Commercial' },
  ];

  const images = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'wedding',
      title: 'Elegant Wedding Ceremony',
      description: 'A beautiful outdoor wedding ceremony captured in golden hour light',
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'portrait',
      title: 'Professional Headshot',
      description: 'Corporate headshot with natural lighting and professional styling',
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'event',
      title: 'Corporate Event',
      description: 'Professional event photography capturing key moments and interactions',
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'commercial',
      title: 'Product Photography',
      description: 'High-end commercial photography for brand marketing',
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'portrait',
      title: 'Family Portrait',
      description: 'Warm family portrait session in natural outdoor setting',
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'wedding',
      title: 'Wedding Reception',
      description: 'Joyful moments from wedding reception celebration',
    },
    {
      id: 7,
      url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'event',
      title: 'Birthday Celebration',
      description: 'Special birthday celebration with friends and family',
    },
    {
      id: 8,
      url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
      category: 'commercial',
      title: 'Brand Photography',
      description: 'Creative brand photography for marketing campaigns',
    },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const currentImageIndex = selectedImage 
    ? filteredImages.findIndex(img => img.url === selectedImage)
    : -1;

  const showPrevious = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(filteredImages[currentImageIndex - 1].url);
    }
  };

  const showNext = () => {
    if (currentImageIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentImageIndex + 1].url);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our collection of memorable moments and artistic captures
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white sticky top-16 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                  <p className="text-sm">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="h-8 w-8" />
          </button>

          {currentImageIndex > 0 && (
            <button
              onClick={showPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {currentImageIndex < filteredImages.length - 1 && (
            <button
              onClick={showNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full object-contain"
          />

          {/* Image Info */}
          {filteredImages[currentImageIndex] && (
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">
                {filteredImages[currentImageIndex].title}
              </h3>
              <p className="text-sm text-gray-300">
                {filteredImages[currentImageIndex].description}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Portfolio;