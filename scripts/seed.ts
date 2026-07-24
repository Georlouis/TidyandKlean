import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import News from '../src/models/News';
import Service from '../src/models/Service';
import Testimonial from '../src/models/Testimonial';
import HomeStat from '../src/models/HomeStat';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const servicesData = [
  {
    title: "Deep Cleaning",
    description: "Our deep cleaning service is a comprehensive top-to-bottom cleaning of your home or office. We reach the hidden dirt and grime that regular cleaning misses. Perfect for spring cleaning or when your space needs a fresh start.",
    features: ["Baseboards and doors", "Inside appliances (oven, fridge)", "Deep dusting of all surfaces", "Window sills and tracks"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Vacation Rental Turnover",
    description: "Designed specifically for Airbnb hosts and vacation rentals. We ensure the property is perfectly prepared for the next guest with hotel-standard housekeeping, laundry turnover, and supply restocking.",
    features: ["Linens and towels washing", "Restocking toiletries", "Damage inspection reporting", "Hotel-style bed making"],
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Move-In / Move-Out",
    description: "Make your transition smooth. We ensure your old home is left spotless for the next occupants, or we prepare your new home to be perfectly clean and sanitized before you move in.",
    features: ["Inside all cabinets and drawers", "Wall spot cleaning", "Deep carpet vacuuming", "Full bathroom sanitization"],
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Standard / Recurring Cleaning",
    description: "Keep your home consistently clean with our weekly, bi-weekly, or monthly cleaning services. Enjoy a pristine environment without lifting a finger.",
    features: ["Dusting and wiping surfaces", "Floors (vacuum and mop)", "Kitchen and bathroom cleaning", "Trash removal"],
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
  }
];

const newsData = [
  {
    title: "5 Spring Cleaning Tips for Florida Homes",
    excerpt: "Get your home ready for the warm weather with these essential spring cleaning tips tailored for the Florida climate.",
    content: "Full content goes here. (Placeholder for now).",
    date: "March 15, 2026",
    category: "Tips & Tricks",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    slug: "5-spring-cleaning-tips"
  },
  {
    title: "How to Prepare Your Airbnb for the Busy Season",
    excerpt: "Maximize your five-star reviews by ensuring your property is perfectly clean and stocked before the rush.",
    content: "Full content goes here. (Placeholder for now).",
    date: "February 28, 2026",
    category: "Property Management",
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    slug: "prepare-airbnb-busy-season"
  },
  {
    title: "Tidy & Klean Launches New Packages for Vacation Rentals",
    excerpt: "We are thrilled to announce new specialized cleaning packages for Airbnb and vacation rentals in the Destin and Fort Walton Beach area.",
    content: "Full content goes here. (Placeholder for now).",
    date: "January 10, 2026",
    category: "Company News",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    slug: "new-packages-vacation-rentals"
  }
];

const testimonialsData = [
  {
    authorName: "Sarah Mitchell",
    authorLocation: "Destin, FL",
    initials: "SM",
    content: "Tidy & Klean is an absolute lifesaver. Their team was professional, on time, and left our Florida vacation home looking brand new. Highly recommended!",
    rating: 5
  },
  {
    authorName: "James Peterson",
    authorLocation: "Destin, FL",
    initials: "JP",
    content: "I've hired many cleaning services before, but the attention to detail from Tidy & Klean is unmatched. The deep cleaning was completely transformative.",
    rating: 5
  },
  {
    authorName: "Amanda Rodriguez",
    authorLocation: "Miramar Beach, FL",
    initials: "AR",
    content: "Incredible service! Booking online was super easy, and the crew that arrived was friendly and very thorough. I love the satisfaction guarantee.",
    rating: 5
  }
];

const homeStatsData = {
  cleaningsDone: 5000,
  happyClientsPercentage: 99,
  proCleaners: 50,
  averageRating: 4.9
};

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected!');

    // Clear existing data
    console.log('Clearing existing data...');
    await News.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await HomeStat.deleteMany({});

    // Insert new data
    console.log('Inserting Services...');
    await Service.insertMany(servicesData);
    
    console.log('Inserting News...');
    await News.insertMany(newsData);
    
    console.log('Inserting Testimonials...');
    await Testimonial.insertMany(testimonialsData);
    
    console.log('Inserting HomeStats...');
    await HomeStat.create(homeStatsData);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();
