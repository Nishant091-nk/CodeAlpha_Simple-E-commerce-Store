const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise canceling with two processors and eight microphones. Exceptional sound quality with Auto NC Optimizer. Precise Voice Pickup Technology enables clear calls.',
    price: 279.99,
    originalPrice: 349.99,
    category: 'Electronics',
    brand: 'Sony',
    images: ['https://picsum.photos/seed/sony-wh1000/600/600'],
    stock: 45,
    featured: true,
    rating: 4.8,
    numReviews: 128,
    tags: ['wireless', 'noise-canceling', 'premium'],
  },
  {
    name: 'Apple MacBook Air M3',
    description: 'Supercharged by the next-generation M3 chip, MacBook Air is faster and more capable than ever. With up to 18 hours of battery life and a stunning Liquid Retina display.',
    price: 1099.00,
    originalPrice: 1299.00,
    category: 'Electronics',
    brand: 'Apple',
    images: ['https://picsum.photos/seed/macbook-air/600/600'],
    stock: 20,
    featured: true,
    rating: 4.9,
    numReviews: 264,
    tags: ['laptop', 'M3', 'portable'],
  },
  {
    name: 'Levi\'s 511 Slim Fit Jeans',
    description: 'The Levi\'s 511 Slim Jeans are cut close from the hip through the thigh with a slim leg opening. Sits below the waist. Made with advanced stretch technology.',
    price: 69.50,
    originalPrice: 89.50,
    category: 'Clothing',
    brand: "Levi's",
    images: ['https://picsum.photos/seed/levis-jeans/600/600'],
    stock: 80,
    featured: false,
    rating: 4.4,
    numReviews: 89,
    tags: ['jeans', 'slim-fit', 'denim'],
  },
  {
    name: 'Atomic Habits by James Clear',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits.',
    price: 16.99,
    originalPrice: 27.00,
    category: 'Books',
    brand: 'Penguin',
    images: ['https://picsum.photos/seed/atomic-habits/600/600'],
    stock: 150,
    featured: true,
    rating: 4.9,
    numReviews: 512,
    tags: ['self-help', 'productivity', 'bestseller'],
  },
  {
    name: 'Dyson V15 Detect Cordless Vacuum',
    description: 'The most powerful, intelligent cordless vacuum. Detects hidden dust and automatically optimizes suction across floor types. LCD screen shows performance data in real time.',
    price: 649.99,
    originalPrice: 749.99,
    category: 'Home',
    brand: 'Dyson',
    images: ['https://picsum.photos/seed/dyson-v15/600/600'],
    stock: 15,
    featured: true,
    rating: 4.7,
    numReviews: 342,
    tags: ['vacuum', 'cordless', 'smart'],
  },
  {
    name: 'Nike Air Zoom Pegasus 41',
    description: 'The Nike Air Zoom Pegasus 41 is the next chapter in the iconic series. Responsive and cushioned, its redesigned upper and midsole make it more versatile than ever.',
    price: 130.00,
    category: 'Sports',
    brand: 'Nike',
    images: ['https://picsum.photos/seed/nike-pegasus/600/600'],
    stock: 60,
    featured: true,
    rating: 4.6,
    numReviews: 178,
    tags: ['running', 'zoom', 'cushioned'],
  },
  {
    name: 'Charlotte Tilbury Pillow Talk Lipstick',
    description: 'THE iconic nude-pink lip color adored worldwide. A universal flattering nude-pink shade that suits all skin tones. Long-lasting, comfortable formula with a satin finish.',
    price: 36.00,
    category: 'Beauty',
    brand: 'Charlotte Tilbury',
    images: ['https://picsum.photos/seed/ct-lipstick/600/600'],
    stock: 90,
    featured: false,
    rating: 4.8,
    numReviews: 421,
    tags: ['lipstick', 'nude', 'luxury'],
  },
  {
    name: 'LEGO Technic 4x4 Mercedes-Benz Zetros Trial Truck',
    description: 'Build and explore with this highly detailed LEGO Technic replica of the Mercedes-Benz Zetros trial truck. Features working 4x4 drive and steering, detailed V8 engine and more.',
    price: 249.99,
    originalPrice: 299.99,
    category: 'Toys',
    brand: 'LEGO',
    images: ['https://picsum.photos/seed/lego-technic/600/600'],
    stock: 25,
    featured: true,
    rating: 4.7,
    numReviews: 93,
    tags: ['lego', 'technic', 'building'],
  },
  {
    name: 'Samsung 65" QLED 4K Smart TV',
    description: 'Quantum Dot technology brings over a billion colors to life. 100% Color Volume with Quantum Dot. Object Tracking Sound+ fills your room with immersive audio that follows the action.',
    price: 1299.99,
    originalPrice: 1799.99,
    category: 'Electronics',
    brand: 'Samsung',
    images: ['https://picsum.photos/seed/samsung-tv/600/600'],
    stock: 12,
    featured: true,
    rating: 4.5,
    numReviews: 201,
    tags: ['4K', 'QLED', 'smart-tv'],
  },
  {
    name: 'Patagonia Down Sweater Jacket',
    description: 'Ultralight, compressible 800-fill-power down jacket for exceptional warmth. Made with traceable down and recycled materials. Stuffs into its own chest pocket.',
    price: 279.00,
    category: 'Clothing',
    brand: 'Patagonia',
    images: ['https://picsum.photos/seed/patagonia-down/600/600'],
    stock: 35,
    featured: false,
    rating: 4.8,
    numReviews: 156,
    tags: ['jacket', 'down', 'outdoor'],
  },
  {
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    description: '7 appliances in 1: Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté, Yogurt Maker and Warmer. 14 one-touch Smart Programs for ribs, soups, beans, poultry and more.',
    price: 89.99,
    originalPrice: 119.99,
    category: 'Home',
    brand: 'Instant Pot',
    images: ['https://picsum.photos/seed/instant-pot/600/600'],
    stock: 55,
    featured: false,
    rating: 4.7,
    numReviews: 892,
    tags: ['kitchen', 'pressure-cooker', 'multi-cooker'],
  },
  {
    name: 'Theragun Pro Percussive Therapy Device',
    description: 'Professional-grade percussive therapy with industry-leading amplitude and noise cancellation. Includes 6 attachments, smart app integration, and 300-minute battery life.',
    price: 399.00,
    originalPrice: 499.00,
    category: 'Sports',
    brand: 'Therabody',
    images: ['https://picsum.photos/seed/theragun/600/600'],
    stock: 28,
    featured: false,
    rating: 4.6,
    numReviews: 234,
    tags: ['recovery', 'massage', 'fitness'],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@luxe.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('👤 Admin created: admin@luxe.com / admin123');

    // Create sample user
    await User.create({
      name: 'John Doe',
      email: 'user@luxe.com',
      password: 'user123',
    });
    console.log('👤 User created: user@luxe.com / user123');

    // Insert products
    await Product.insertMany(products);
    console.log(`📦 Inserted ${products.length} products`);

    console.log('\n✨ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDB();
