const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');

const sampleProducts = [
  { name: 'Wireless Noise-Cancelling Headphones', description: 'Premium over-ear headphones with 30-hour battery life and industry-leading noise cancellation.', price: 12999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', stock: 25, featured: true },
  { name: 'Leather Crossbody Bag', description: 'Handcrafted genuine leather bag with adjustable strap and gold-tone hardware.', price: 3499, category: 'Clothing', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', stock: 40, featured: true },
  { name: 'Minimalist Watch', description: 'Stainless steel watch with sapphire crystal glass and Japanese movement.', price: 8999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', stock: 15, featured: true },
  { name: 'Yoga Mat Premium', description: 'Non-slip eco-friendly yoga mat, 6mm thick with alignment lines.', price: 1899, category: 'Sports', image: 'https://images.unsplash.com/photo-1601925228932-3fd1890bce05?w=600&q=80', stock: 50 },
  { name: 'The Art of Mindfulness', description: 'Bestselling guide to mindfulness and modern meditation practices.', price: 499, category: 'Books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80', stock: 100 },
  { name: 'Scented Soy Candle Set', description: 'Set of 3 hand-poured soy wax candles in amber, sandalwood, and vanilla.', price: 1299, category: 'Home', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80', stock: 35, featured: true },
  { name: 'Organic Face Serum', description: 'Vitamin C brightening serum with hyaluronic acid for radiant skin.', price: 2199, category: 'Beauty', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80', stock: 60 },
  { name: 'Mechanical Keyboard', description: 'Compact TKL keyboard with Cherry MX switches and RGB backlight.', price: 7499, category: 'Electronics', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80', stock: 20 },
  { name: 'Bamboo Cutting Board Set', description: 'Set of 3 organic bamboo cutting boards with juice groove.', price: 999, category: 'Home', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', stock: 45 },
  { name: 'Resistance Band Set', description: '5-piece resistance band set for home workouts. Levels 10–50 lbs.', price: 699, category: 'Sports', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&q=80', stock: 80 },
  { name: 'Silk Sleep Mask', description: '100% pure silk sleep mask with adjustable strap. Ultra-soft.', price: 799, category: 'Beauty', image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&q=80', stock: 55 },
  { name: 'Building Blocks Set 200pc', description: 'Creative STEM building blocks for ages 3+. 200 colorful pieces.', price: 1499, category: 'Toys', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80', stock: 30 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    await Product.insertMany(sampleProducts);
    console.log(`🌱 Seeded ${sampleProducts.length} products`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
