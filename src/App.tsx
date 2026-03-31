import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MapPin, 
  ChevronRight, 
  Star, 
  Droplets, 
  Zap, 
  Flame, 
  Menu, 
  X, 
  ArrowRight,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  CheckCircle2
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-pepper-black/90 backdrop-blur-md py-3 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <a href="/" className="text-3xl font-display text-pepper-red tracking-tighter">DR PEPPER</a>
          <div className="hidden md:flex gap-6 text-sm font-semibold uppercase tracking-widest opacity-80">
            <a href="#" className="hover:text-pepper-red transition-colors">Flavors</a>
            <a href="#" className="hover:text-pepper-red transition-colors">Story</a>
            <a href="#" className="hover:text-pepper-red transition-colors">Rewards</a>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <button className="px-6 py-2 rounded-full border border-white/20 text-sm font-bold uppercase hover:bg-white hover:text-pepper-black transition-all">Locate</button>
          <button className="px-6 py-2 rounded-full bg-pepper-red text-white text-sm font-bold uppercase hover:scale-105 transition-all shadow-lg shadow-pepper-red/20">Buy Now</button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-pepper-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
            <a href="#" className="text-2xl font-display">Flavors</a>
            <a href="#" className="text-2xl font-display">Story</a>
            <a href="#" className="text-2xl font-display">Rewards</a>
            <div className="flex flex-col gap-3 pt-4">
              <button className="w-full py-4 rounded-xl bg-pepper-red text-white font-bold uppercase">Buy Now</button>
              <button className="w-full py-4 rounded-xl border border-white/20 font-bold uppercase">Find Near Me</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 fizz-bg opacity-50 pointer-events-none" />
      
      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 opacity-20 hidden lg:block"
      >
        <Droplets size={120} className="text-pepper-maroon" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-widest mb-6">
            <Zap size={14} className="text-pepper-red" />
            <span>The Original 23 Flavors</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl mb-6 leading-[0.9]">
            ONE OF A <br />
            <span className="text-pepper-red">KIND</span> TASTE.
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-lg leading-relaxed">
            It's not a cola. It's not a root beer. It's a mysterious blend of 23 flavors that defies description. Try it, and you'll get it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-pepper-red text-white font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-pepper-red/40">
              Try It Now <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-white/20 font-bold uppercase tracking-widest hover:bg-white hover:text-pepper-black transition-all">
              <MapPin size={18} /> Find Near You
            </button>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: y1, rotate }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-pepper-maroon/20 rounded-full blur-[100px]" />
          <img 
            src="https://picsum.photos/seed/drpepper-can/800/1200" 
            alt="Dr Pepper Can" 
            className="w-full max-w-[400px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] relative z-10 rounded-3xl"
            referrerPolicy="no-referrer"
          />
          {/* Micro-interaction: Fizz particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -100, x: (i % 2 === 0 ? 20 : -20) * Math.random() }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: i * 0.2 }}
              className="absolute w-2 h-2 bg-white/40 rounded-full blur-[1px]"
              style={{ bottom: '20%', left: `${20 + Math.random() * 60}%` }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FlavorHook = () => {
  const flavors = [
    { name: "Cherry", icon: <Flame className="text-red-500" /> },
    { name: "Vanilla", icon: <Droplets className="text-yellow-200" /> },
    { name: "Licorice", icon: <Zap className="text-purple-600" /> },
    { name: "Almond", icon: <Star className="text-amber-400" /> },
    { name: "Caramel", icon: <Droplets className="text-orange-400" /> },
    { name: "And 18 More...", icon: <Zap className="text-pepper-red" /> },
  ];

  return (
    <section className="py-24 bg-white/5 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl mb-4">23 FLAVORS. <span className="text-pepper-red">0 COMPROMISE.</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">A complex masterpiece of flavor engineering. Each sip reveals a new layer of the mystery.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {flavors.map((flavor, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.1)' }}
              className="p-8 rounded-3xl border border-white/10 flex flex-col items-center gap-4 text-center glass-card transition-all cursor-pointer group"
            >
              <div className="p-4 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform">
                {flavor.icon}
              </div>
              <span className="font-display text-xl">{flavor.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const reviews = [
    { name: "Alex Z.", text: "I can't describe it, but I can't stop drinking it. It's like a party in my mouth.", rating: 5 },
    { name: "Sarah M.", text: "The Zero Sugar version actually tastes like the real thing. Game changer.", rating: 5 },
    { name: "Marcus L.", text: "23 flavors? More like 23 reasons why this is the best drink ever made.", rating: 5 },
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl mb-4 italic">PEOPLE CAN'T DESCRIBE IT... <br /><span className="text-pepper-red">BUT THEY LOVE IT.</span></h2>
          </div>
          <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full border border-white/10">
            <div className="flex text-pepper-red">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="font-bold">4.9/5 Based on 10k+ Reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-3xl glass-card relative"
            >
              <div className="flex gap-1 text-pepper-red mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-lg italic mb-6">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pepper-maroon flex items-center justify-center font-bold">{review.name[0]}</div>
                <span className="font-bold opacity-60">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductVariants = () => {
  const variants = [
    { name: "Original", color: "bg-pepper-maroon", img: "https://picsum.photos/seed/dp-orig/400/600" },
    { name: "Zero Sugar", color: "bg-black", img: "https://picsum.photos/seed/dp-zero/400/600" },
    { name: "Cherry", color: "bg-red-900", img: "https://picsum.photos/seed/dp-cherry/400/600" },
    { name: "Cream Soda", color: "bg-amber-900", img: "https://picsum.photos/seed/dp-cream/400/600" },
  ];

  return (
    <section className="py-24 bg-pepper-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-7xl mb-12 text-center">PICK YOUR <span className="text-pepper-red">POISON.</span></h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {variants.map((v, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -15 }}
              className="group relative rounded-[40px] overflow-hidden bg-white/5 border border-white/10 p-4 flex flex-col h-full"
            >
              <div className={`aspect-[3/4] rounded-[32px] ${v.color} overflow-hidden relative mb-6`}>
                <img 
                  src={v.img} 
                  alt={v.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              </div>
              <div className="px-4 pb-4 flex flex-col flex-grow">
                <h3 className="text-3xl mb-2">{v.name}</h3>
                <p className="text-white/60 text-sm mb-6 flex-grow">The classic taste you know, with a bold twist of {v.name.toLowerCase()}.</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-3 rounded-2xl bg-white text-pepper-black font-bold uppercase text-xs hover:bg-pepper-red hover:text-white transition-colors">Buy Now</button>
                  <button className="p-3 rounded-2xl border border-white/20 hover:bg-white/10 transition-colors"><ShoppingBag size={18} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandStory = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-pepper-maroon/10" />
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/history/800/800" 
              alt="Vintage Dr Pepper" 
              className="rounded-3xl shadow-2xl rotate-[-3deg]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pepper-red/20 rounded-full blur-3xl" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-5xl md:text-7xl mb-8">EST. 1885. <br /><span className="text-pepper-red">OLDER THAN COKE.</span></h2>
          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Born in Waco, Texas, Dr Pepper is the oldest major soft drink in America. We've been keeping the mystery alive for over 135 years. 
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-lg font-semibold">
              <CheckCircle2 className="text-pepper-red" /> Created by pharmacist Charles Alderton
            </li>
            <li className="flex items-center gap-3 text-lg font-semibold">
              <CheckCircle2 className="text-pepper-red" /> The secret formula is split in two vaults
            </li>
            <li className="flex items-center gap-3 text-lg font-semibold">
              <CheckCircle2 className="text-pepper-red" /> 23 flavors, 0 apologies
            </li>
          </ul>
          <button className="px-8 py-4 rounded-full border border-pepper-red text-pepper-red font-bold uppercase hover:bg-pepper-red hover:text-white transition-all">
            Read The Full Story
          </button>
        </div>
      </div>
    </section>
  );
};

const StoreLocator = () => {
  return (
    <section className="py-24 bg-white text-pepper-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl mb-6">FIND YOUR <br /><span className="text-pepper-red">FIX.</span></h2>
            <p className="text-xl opacity-70 mb-10">Don't wait for the craving to hit. Find the nearest Dr Pepper in seconds.</p>
            <div className="flex gap-2 max-w-md">
              <input 
                type="text" 
                placeholder="Enter Zip Code" 
                className="flex-1 px-6 py-4 rounded-2xl bg-pepper-black/5 border border-pepper-black/10 focus:outline-none focus:border-pepper-red"
              />
              <button className="px-8 py-4 rounded-2xl bg-pepper-red text-white font-bold uppercase">Search</button>
            </div>
          </div>
          <div className="h-[400px] bg-pepper-black/5 rounded-[40px] border border-pepper-black/10 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/map/1200/800')] bg-cover bg-center" />
             <div className="relative z-10 text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl border border-white">
                <MapPin size={48} className="text-pepper-red mx-auto mb-4" />
                <h4 className="text-2xl font-display mb-2">12 Locations Nearby</h4>
                <p className="text-sm opacity-60">Waco, TX area</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  return (
    <section className="py-24 bg-pepper-maroon relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-[150px]" />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl mb-6">JOIN THE <span className="text-white">INNER CIRCLE.</span></h2>
        <p className="text-xl text-white/80 mb-10">Get exclusive access to limited drops, secret flavors, and rewards that actually matter.</p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="flex-1 px-8 py-5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all"
          />
          <button className="px-10 py-5 rounded-full bg-white text-pepper-maroon font-bold uppercase tracking-widest hover:scale-105 transition-all">
            Unlock Access
          </button>
        </form>
        <p className="mt-6 text-sm text-white/40">By joining, you agree to our mystery. No spam, just flavors.</p>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-pepper-black pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-2">
            <a href="/" className="text-4xl font-display text-pepper-red mb-8 block">DR PEPPER</a>
            <p className="text-white/40 max-w-xs mb-8">The oldest major soft drink in America. Still original, still mysterious, still one of a kind.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pepper-red transition-colors"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pepper-red transition-colors"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pepper-red transition-colors"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pepper-red transition-colors"><Youtube size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg mb-6">Products</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Dr Pepper Original</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Zero Sugar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cherry</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cream Soda</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/20 uppercase tracking-widest font-bold">
          <p>© 2026 DR PEPPER/SEVEN UP, INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#">Terms of Use</a>
            <a href="#">Accessibility</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-md md:hidden"
        >
          <div className="bg-pepper-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex gap-2 shadow-2xl">
            <button className="flex-1 py-4 rounded-xl bg-pepper-red text-white font-bold uppercase text-sm shadow-lg shadow-pepper-red/20">Buy Now</button>
            <button className="flex-1 py-4 rounded-xl border border-white/20 text-white font-bold uppercase text-sm">Find Store</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <FlavorHook />
        <SocialProof />
        <ProductVariants />
        <BrandStory />
        <StoreLocator />
        <Newsletter />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
