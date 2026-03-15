// src/pages/Navigation.jsx
import { Link } from "react-router-dom";
import { IoMdPricetag } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndoAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { FaBars, FaTimes } from 'react-icons/fa';
function Navigation() {
  const [currentImage, setCurrentImage] = useState(0);
const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { id: "all", name: "All Products" },
    { id: "womens-fashion", name: "Women Fashion" },
    { id: "mens-collection", name: "Men Collection" },
    { id: "kids-wear", name: "Kids Category" },
    {id:"Accessories",name:"Accessories and jewelery"},
    { id: "Signup", name: "Register" },
    {id:"Signin",name:"SIGNIN"}
  ];
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  

  const heroImages = [
    "https://akcollections.pk/cdn/shop/files/WhatsApp-Image-2025-04-02-at-8.02.42-PM_600x.jpg?v=1752570097",
    "https://monoandco.pk/cdn/shop/files/IMG_20231009_150801.jpg?v=1696997240",
    "https://img.drz.lazcdn.com/static/pk/p/34c618a9ffa5158503c976c8af7720c7.jpg_960x960q80.jpg_.webp",
  ];

  // Auto-rotate hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const features = [
    {
      icon: FaTruck,
      title: "Free Shipping",
      description: "On orders above Rs. 5000",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    {
      icon: FaUndoAlt,
      title: "Easy Returns",
      description: "7-day return policy",
    },
    {
      icon: IoMdPricetag,
      title: "Best Prices",
      description: "Guaranteed low prices",
    },
  ];

  // Navigation.jsx mein categories array
const categories = [
  { 
    name: "Women's Fashion", 
    link: "womens-fashion",  // URL ke liye
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3UBSuc8MJZFDmewGPuGdWBGAI1UhoHSZFpQ&s", 
    count: 50 
  },
  { 
    name: "Men's Collection", 
    link: "mens-collection",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&auto=format&fit=crop", 
    count: 50 
  },
  { 
    name: "Kids Wear", 
    link: "kids-wear",
    image: "https://www.suratsuit.in/product-img/Kid-s-Clothing-Set-Baba-Suit-B-1688391083.jpeg", 
    count: 50 
  },
  { 
    name: "Accessories", 
    link: "accessories",
    image: "https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?w=500&auto=format&fit=crop", 
    count: 60 
  }
];
  const facebook = () => {
    window.open("https://www.facebook.com/khanclothing", "_blank");
  };
  const instagram = () => {
    window.open("https://www.instagram.com/khanclothing", "_blank");
  };
  const twitter = () => {
    window.open("https://www.twitter.com/khanclothing", "_blank");
  };
  const testimonials = [
    {
      name: "Sarah Ahmed",
      text: "Amazing quality and fast delivery! The velvet collection is absolutely stunning.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Ali Raza",
      text: "Best online shopping experience in Pakistan. Highly recommended!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Fatima Khan",
      text: "Great customer service and beautiful designs. Will shop again!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];
  const handleCategoryClick = (catId) => {
    if (catId === "womens-fashion") {
      navigate("/category/womens-fashion");
    } else if (catId === "mens-collection") {
      navigate("/category/mens-collection");
    } else if (catId === "kids-wear") {
      navigate("/category/kids-wear");
    } else if (catId === "Accessories") {
      navigate("/category/accessories");
    }
    else if (catId === "Signup") {
      navigate("/signup");
    } 
    else if (catId === "Signin") {
      navigate("/signin");
    } 
    
    else {
      setActiveCategory(catId);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="hidden md:block">Hey there! Welcome to KHAN CLOTHING</p>
          
        </div>
      </div>
      {/* Main Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                  {/* Mobile Menu Button */}
                  <button 
                    className="lg:hidden text-2xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                  </button>
      
                  {/* Logo */}
                  <div className="text-2xl font-bold tracking-wider">
                    KHAN<span className="text-gray-500 text-sm ml-1">CLOTHING</span>
                  </div>
                  
                  <div>
                    <button onClick={() => navigate("/signin")} className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ">
                      Sign In
                    </button>
                    
                    <div className="inline-block mx-2"></div>
                    
                    <button onClick={() => navigate("/signup")} className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                      Sign Up
                    </button>
                  </div>
      
                  {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {menuItems.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`font-medium transition-colors hover:text-gray-900 ${
                    activeCategory === cat.id ? 'text-black border-b-2 border-black' : 'text-gray-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
                 
      
                 
                </div>
      
                
                
                {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="lg:hidden py-4 border-t animate-slideDown">
              {menuItems.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    handleCategoryClick(cat.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 px-4 font-medium transition-colors ${
                    activeCategory === cat.id ? 'bg-gray-100 text-black' : 'text-gray-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          )}
              </div>
            </header>

      

      {/* Hero Section with Auto-rotating Background */}
<section className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] overflow-hidden">
  {heroImages.map((img, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        index === currentImage ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={img}
        alt={`Hero ${index + 1}`}
        className="w-full h-full object-cover md:object-contain lg:object-cover xl:object-contain bg-gray-900"
      />
    </div>
  ))}
  
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent md:from-black/70 md:via-black/50"></div>

  {/* Content */}
  <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center z-10">
    <div className="max-w-xl sm:max-w-2xl text-white">
      <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-pulse">
        🎉 New Collection 2026
      </span>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
        Discover Your <br />
        <span className="text-amber-300">Perfect Style</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 max-w-lg sm:max-w-xl">
        Explore our latest collection of elegant and contemporary fashion.
        Quality clothing that makes you feel confident and beautiful.
      </p>
      <div className="flex flex-wrap gap-3 sm:gap-4">
        <Link to="/signup">
          <button className="bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 text-sm sm:text-base group">
            Start Shopping 
            <FaArrowRight className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  </div>

  {/* Hero Indicators */}
  <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
    {heroImages.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentImage(index)}
        className={`transition-all duration-300 ease-in-out ${
          index === currentImage 
            ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-white" 
            : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/50 hover:bg-white/80"
        } rounded-full`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-900 transition-colors shadow-md">
                  <feature.icon className="text-2xl text-gray-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
            <p className="text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200">
                    {category.count} Products
                  </p>
                  <Link to={`/category/${category.link}`}>
                    <button className="mt-3 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
            <p className="text-gray-600">Join thousands of happy customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Join the KHAN CLOTHING Family
          </h3>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Subscribe to get special offers, free giveaways, and exclusive
            deals.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4">
                KHAN<span className="text-gray-400 text-sm ml-1">CLOTHING</span>
              </h4>
              <p className="text-gray-400 text-sm">
                Your destination for elegant and contemporary fashion since
                2025.
              </p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={facebook}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaFacebookF />
                </button>
                <button
                  onClick={instagram}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaInstagram />
                </button>
                <button
                  onClick={twitter}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTwitter />
                </button>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faqs"
                    className="hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/size-guide"
                    className="hover:text-white transition-colors"
                  >
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@khanclothing.pk</li>
                <li>Phone: +92 347 8597038</li>
                <li>📍 Karachi, Pakistan</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2026 KHAN CLOTHING. All rights reserved. Made with ❤️ in
              Pakistan
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Navigation;
