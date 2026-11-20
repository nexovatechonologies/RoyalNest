import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';

import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Heart,
  Search,
  Menu,
  X,
  CalendarDays,
  ShieldCheck,
  KeyRound,
  Check,
  Calculator,
  Home,
  Building2,
  IndianRupee,
  Compass
} from 'lucide-react';

import './style.css';

gsap.registerPlugin(ScrollTrigger);

// GitHub Pages-compatible image paths.
// Images must be inside public/images/

const BASE = import.meta.env.BASE_URL;

const image = (filename) => `${BASE}images/${filename}`;

const states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

const propertyTypes = [
  'All types',
  'Apartment',
  'Independent house',
  'Villa'
];

// Demonstration properties and illustrative prices.
// Verify property details before commercial use.

const properties = [
  {
    id: 1,
    name: 'Greenview Family Apartment',
    city: 'Hyderabad',
    state: 'Telangana',
    price: 7800000,
    type: 'Apartment',
    beds: 3,
    baths: 2,
    area: '1,420',
    tag: 'Family friendly',
    image: image('apartment-home.webp'),
    desc: 'A practical, light-filled apartment in a landscaped residential community, with a balcony and everyday conveniences nearby.',
    features: [
      'Balcony',
      'Lift access',
      'Covered parking',
      'Community garden'
    ]
  },
  {
    id: 2,
    name: 'The Courtyard Home',
    city: 'Pune',
    state: 'Maharashtra',
    price: 14500000,
    type: 'Independent house',
    beds: 3,
    baths: 3,
    area: '1,850',
    tag: 'New listing',
    image: image('independent-home.webp'),
    desc: 'A welcoming independent home with a shaded entrance, private outdoor space and comfortable family living areas.',
    features: [
      'Private courtyard',
      'Modular kitchen',
      'Two car parking',
      'Terrace'
    ]
  },
  {
    id: 3,
    name: 'Maple Residency',
    city: 'Bengaluru',
    state: 'Karnataka',
    price: 9200000,
    type: 'Apartment',
    beds: 2,
    baths: 2,
    area: '1,180',
    tag: 'Good value',
    image: image('apartment-home.webp'),
    desc: 'A well-planned apartment option with practical room sizes and a calm residential setting.',
    features: [
      'Balcony',
      'Security',
      'Power backup',
      'Children’s play area'
    ]
  },
  {
    id: 4,
    name: 'Sunrise Independent Home',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    price: 4850000,
    type: 'Independent house',
    beds: 2,
    baths: 2,
    area: '1,100',
    tag: 'Budget friendly',
    image: image('family-home.webp'),
    desc: 'A modest two-storey family home with a straightforward layout, natural light and a small front garden.',
    features: [
      'Front sit-out',
      'Terrace access',
      'Two bedrooms',
      'Street parking'
    ]
  },
  {
    id: 5,
    name: 'Palm Grove Villa',
    city: 'Chandigarh',
    state: 'Chandigarh',
    price: 22500000,
    type: 'Villa',
    beds: 4,
    baths: 4,
    area: '2,650',
    tag: 'Premium home',
    image: image('premium-villa.webp'),
    desc: 'A contemporary villa with generous shared spaces, landscaped edges and warm natural finishes.',
    features: [
      'Garden',
      'Deck area',
      'Large kitchen',
      'Covered parking'
    ]
  },
  {
    id: 6,
    name: 'Lakeview Homes',
    city: 'Kochi',
    state: 'Kerala',
    price: 6300000,
    type: 'Apartment',
    beds: 2,
    baths: 2,
    area: '1,050',
    tag: 'Smart choice',
    image: image('apartment-home.webp'),
    desc: 'A compact, comfortable home for buyers seeking a manageable apartment close to city conveniences.',
    features: [
      'Balcony',
      'Lift',
      'Security',
      'Visitor parking'
    ]
  },
  {
    id: 7,
    name: 'Nandan Enclave House',
    city: 'Jaipur',
    state: 'Rajasthan',
    price: 6900000,
    type: 'Independent house',
    beds: 3,
    baths: 2,
    area: '1,500',
    tag: 'Ready to explore',
    image: image('independent-home.webp'),
    desc: 'A practical independent home with a family-sized layout and a quiet residential feel.',
    features: [
      'Terrace',
      'Utility area',
      'Car parking',
      'Independent entry'
    ]
  },
  {
    id: 8,
    name: 'Orchard Lane Residence',
    city: 'Amritsar',
    state: 'Punjab',
    price: 11200000,
    type: 'Independent house',
    beds: 3,
    baths: 3,
    area: '1,720',
    tag: 'Featured home',
    image: image('family-home.webp'),
    desc: 'A modern family residence with a bright living area, balcony and a modest landscaped frontage.',
    features: [
      'Balcony',
      'Front garden',
      'Modular kitchen',
      'Parking'
    ]
  },
  {
    id: 9,
    name: 'Skyline Comfort Apartments',
    city: 'Chennai',
    state: 'Tamil Nadu',
    price: 5700000,
    type: 'Apartment',
    beds: 2,
    baths: 2,
    area: '980',
    tag: 'City living',
    image: image('apartment-home.webp'),
    desc: 'A neatly planned city apartment with efficient use of space and shared residential amenities.',
    features: [
      'Lift access',
      'Security',
      'Balcony',
      'Power backup'
    ]
  },
  {
    id: 10,
    name: 'Meadowview Villa',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    price: 16800000,
    type: 'Villa',
    beds: 4,
    baths: 3,
    area: '2,300',
    tag: 'Spacious living',
    image: image('premium-villa.webp'),
    desc: 'A spacious contemporary home with open living spaces and a private garden setting.',
    features: [
      'Private garden',
      'Large windows',
      'Family lounge',
      'Parking'
    ]
  },
  {
    id: 11,
    name: 'Parkside Starter Home',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    price: 3650000,
    type: 'Independent house',
    beds: 2,
    baths: 1,
    area: '920',
    tag: 'First home',
    image: image('family-home.webp'),
    desc: 'A simple, compact home for first-time buyers, with essential spaces and room to personalise.',
    features: [
      'Independent entry',
      'Compact kitchen',
      'Small sit-out',
      'Terrace'
    ]
  },
  {
    id: 12,
    name: 'Cedar Heights Apartment',
    city: 'Gurugram',
    state: 'Haryana',
    price: 13200000,
    type: 'Apartment',
    beds: 3,
    baths: 3,
    area: '1,650',
    tag: 'Modern comfort',
    image: image('apartment-home.webp'),
    desc: 'A contemporary apartment layout with comfortable bedrooms and shared community facilities.',
    features: [
      'Balcony',
      'Clubhouse access',
      'Lift',
      'Covered parking'
    ]
  }
];

const inr = (number) =>
  '₹' + Number(number).toLocaleString('en-IN');

const shortINR = (number) =>
  number >= 10000000
    ? `₹${(number / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`
    : `₹${(number / 100000).toFixed(
        number % 100000 === 0 ? 0 : 1
      )} L`;

// Decorative Three.js background

function ThreeBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (
      !canvas ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let renderer;
    let scene;
    let camera;
    let points;
    let animationFrame;
    let resizeObserver;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false
      });

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 1.25)
      );

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        55,
        1,
        0.1,
        30
      );

      camera.position.z = 5;

      const geometry = new THREE.BufferGeometry();

      const count = 48;
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 9;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      }

      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );

      const material = new THREE.PointsMaterial({
        color: 0xd9aa62,
        size: 0.018,
        transparent: true,
        opacity: 0.38
      });

      points = new THREE.Points(geometry, material);

      scene.add(points);

      const resize = () => {
        const width = Math.max(1, canvas.clientWidth);
        const height = Math.max(1, canvas.clientHeight);

        renderer.setSize(width, height, false);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      resize();

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);

      const animate = () => {
        points.rotation.y += 0.00025;

        renderer.render(scene, camera);

        animationFrame = requestAnimationFrame(animate);
      };

      animate();
    } catch (error) {
      console.warn(
        'Decorative 3D background unavailable:',
        error
      );
    }

    return () => {
      cancelAnimationFrame(animationFrame);

      resizeObserver?.disconnect();

      if (points) {
        points.geometry.dispose();
        points.material.dispose();
      }

      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      className="three-bg"
      ref={canvasRef}
      aria-hidden="true"
    />
  );
}

function App() {
  const [category, setCategory] = useState('All types');
  const [query, setQuery] = useState('');
  const [state, setState] = useState('All India');
  const [maxPrice, setMaxPrice] = useState('Any budget');

  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);

  const [booking, setBooking] = useState(false);
  const [mobile, setMobile] = useState(false);

  const [budget, setBudget] = useState(7500000);
  const [deposit, setDeposit] = useState(20);
  const [years, setYears] = useState(20);

  const [toast, setToast] = useState('');
  const [showFav, setShowFav] = useState(false);

  // Property filtering

  const visible = useMemo(() => {
    return properties.filter((property) => {
      const matchesCategory =
        category === 'All types' ||
        property.type === category;

      const matchesState =
        state === 'All India' ||
        property.state === state;

      const matchesBudget =
        maxPrice === 'Any budget' ||
        property.price <= Number(maxPrice);

      const searchableText = (
        property.name +
        ' ' +
        property.city +
        ' ' +
        property.state
      ).toLowerCase();

      const matchesQuery = searchableText.includes(
        query.toLowerCase().trim()
      );

      return (
        matchesCategory &&
        matchesState &&
        matchesBudget &&
        matchesQuery
      );
    });
  }, [category, state, maxPrice, query]);

  const favoriteProperties = properties.filter(
    (property) => favorites.includes(property.id)
  );

  // Smooth scrolling and GSAP animations

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const lenis = reducedMotion
      ? null
      : new Lenis({
          duration: 0.85,
          smoothWheel: true
        });

    let raf = 0;

    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);

      const tick = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    }

    const context = gsap.context(() => {
      if (!reducedMotion) {
        gsap.from('.hero-copy > *', {
          y: 25,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.12
        });

        gsap.utils.toArray('.reveal').forEach((element) => {
          gsap.fromTo(
            element,
            {
              y: 24,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                once: true
              }
            }
          );
        });
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      context.revert();
    };
  }, []);

  // Toast notification

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast('');
    }, 2600);

    return () => clearTimeout(timer);
  }, [toast]);

  // Navigation

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    setMobile(false);
  };

  // Favourite properties

  const toggleFav = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  // EMI calculation

  const emi = () => {
    const principal = budget * (1 - deposit / 100);

    const monthlyRate = 0.085 / 12;
    const totalMonths = years * 12;

    if (monthlyRate === 0) {
      return principal / totalMonths;
    }

    const factor = Math.pow(
      1 + monthlyRate,
      totalMonths
    );

    return (
      (principal * monthlyRate * factor) /
      (factor - 1)
    );
  };

  // Demo enquiry submission

  const submitBooking = (event) => {
    event.preventDefault();

    setBooking(false);

    setToast(
      'Demo enquiry saved in this page session. Connect a backend to receive real enquiries.'
    );
  };

  // Reset search filters

  const resetFilters = () => {
    setCategory('All types');
    setState('All India');
    setMaxPrice('Any budget');
    setQuery('');
  };

  return (
    <>
      {/* HEADER */}

      <header className="header sticky-header">
        <a
          className="brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            scrollTo('#home');
          }}
        >
          <span className="brand-mark">
            <Home size={27} />
          </span>

          <span>
            ROYALNEST
            <small>INDIAN HOMES. BETTER LIVING.</small>
          </span>
        </a>

        <nav className={mobile ? 'nav open' : 'nav'}>
          <a onClick={() => scrollTo('#home')}>Home</a>
          <a onClick={() => scrollTo('#properties')}>Properties</a>
          <a onClick={() => scrollTo('#story')}>Our Approach</a>
          <a onClick={() => scrollTo('#services')}>Services</a>
          <a onClick={() => scrollTo('#contact')}>Contact</a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn favorite-nav"
            onClick={() => setShowFav(true)}
            aria-label="View saved properties"
          >
            <Heart size={18} />
            <span>{favorites.length}</span>
          </button>

          <button
            className="outline-btn small"
            onClick={() => setBooking(true)}
          >
            <CalendarDays size={15} />
            Request a Visit
            <ArrowRight size={15} />
          </button>

          <button
            className="icon-btn mobile-toggle"
            onClick={() => setMobile(!mobile)}
            aria-label="Toggle menu"
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}

        <section className="hero india-hero" id="home">
          <div className="hero-image" />

          <ThreeBackdrop />

          <div className="hero-copy">
            <div className="eyebrow">
              <i />
              HOMES ACROSS INDIA
              <i />
            </div>

            <h1>
              Find your
              <br />
              <em>place to belong.</em>
            </h1>

            <p>
              From practical city apartments to welcoming family homes
              <br />
              and special villas — explore homes across India.
            </p>

            <div className="hero-buttons">
              <button
                className="gold-btn"
                onClick={() => scrollTo('#properties')}
              >
                Explore Homes
                <ArrowRight size={17} />
              </button>

              <button
                className="play-btn"
                onClick={() => scrollTo('#story')}
              >
                <span>
                  <Compass size={15} />
                </span>
                Our approach
              </button>
            </div>
          </div>

          <div className="hero-caption">
            <span>ROYALNEST INDIA</span>
            <b>REAL HOMES FOR DIFFERENT LIVES & BUDGETS</b>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>

          {/* PROPERTY SEARCH PANEL */}

          <div className="search-panel india-search">
            <label>
              <Home />

              <span>
                PROPERTY TYPE

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                >
                  {propertyTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </span>
            </label>

            <label>
              <MapPin />

              <span>
                STATE / UT

                <select
                  value={state}
                  onChange={(event) =>
                    setState(event.target.value)
                  }
                >
                  <option>All India</option>

                  {states.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </span>
            </label>

            <label>
              <IndianRupee />

              <span>
                MAXIMUM BUDGET

                <select
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(event.target.value)
                  }
                >
                  <option>Any budget</option>
                  <option value="3000000">Up to ₹30 lakh</option>
                  <option value="5000000">Up to ₹50 lakh</option>
                  <option value="10000000">Up to ₹1 crore</option>
                  <option value="20000000">Up to ₹2 crore</option>
                  <option value="50000000">Up to ₹5 crore</option>
                </select>
              </span>
            </label>

            <button
              className="search-btn"
              onClick={() => scrollTo('#properties')}
            >
              <Search size={17} />
              Find homes
            </button>
          </div>
        </section>

        {/* QUICK NAVIGATION */}

        <div className="quick-nav">
          <span>EXPLORE</span>

          <button onClick={() => scrollTo('#properties')}>
            Homes
          </button>

          <button onClick={() => scrollTo('#story')}>
            About
          </button>

          <button onClick={() => scrollTo('#services')}>
            Services
          </button>

          <button onClick={() => scrollTo('#calculator')}>
            EMI calculator
          </button>

          <button onClick={() => scrollTo('#contact')}>
            Enquire
          </button>

          <button
            className="quick-fav"
            onClick={() => setShowFav(true)}
          >
            <Heart size={14} />
            Saved ({favorites.length})
          </button>
        </div>

        {/* PROPERTY LISTINGS */}

        <section className="properties section" id="properties">
          <div className="section-intro reveal">
            <div>
              <div className="eyebrow">
                <i />
                A HOME FOR EVERY CHAPTER
              </div>

              <h2>
                Explore homes
                <br />
                <em>that feel right.</em>
              </h2>

              <p>
                Browse a balanced mix of apartments, independent houses
                and villas.
                <br />
                Listings and prices shown here are illustrative demo content.
              </p>
            </div>

            <div className="collection-note">
              <span>INDIA-WIDE SAMPLE</span>
              <strong>01 — 12</strong>
              <small>Everyday homes to premium spaces</small>
            </div>
          </div>

          {/* FILTER TOOLBAR */}

          <div className="toolbar">
            <div className="tabs">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  className={
                    category === type ? 'active' : ''
                  }
                  onClick={() => setCategory(type)}
                >
                  {type === 'All types' ? 'All' : type}
                </button>
              ))}
            </div>

            <div className="search-input">
              <Search size={15} />

              <input
                type="search"
                placeholder="Search city, state or home..."
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
              />
            </div>
          </div>

          {/* PROPERTY CARDS */}

          <div className="property-grid">
            {visible.map((property) => (
              <article
                className="property-card"
                key={property.id}
              >
                <div
                  className="card-image"
                  onClick={() => setSelected(property)}
                  style={{
                    backgroundImage: `url("${property.image}")`
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      setSelected(property);
                    }
                  }}
                  aria-label={`View ${property.name}`}
                >
                  <span className="tag">
                    {property.tag}
                  </span>

                  <button
                    className={
                      favorites.includes(property.id)
                        ? 'heart saved'
                        : 'heart'
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleFav(property.id);
                    }}
                    aria-label="Save property"
                  >
                    <Heart
                      size={18}
                      fill={
                        favorites.includes(property.id)
                          ? 'currentColor'
                          : 'none'
                      }
                    />
                  </button>

                  <button
                    className="view-arrow"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelected(property);
                    }}
                    aria-label="View details"
                  >
                    <ArrowUpRight />
                  </button>
                </div>

                <div className="card-content">
                  <div className="card-location">
                    <MapPin size={13} />
                    {property.city}, {property.state}
                  </div>

                  <h3>{property.name}</h3>

                  <div className="price">
                    {shortINR(property.price)}
                  </div>

                  <div className="specs">
                    <span>
                      <BedDouble />
                      {property.beds} Beds
                    </span>

                    <span>
                      <Bath />
                      {property.baths} Baths
                    </span>

                    <span>
                      <Maximize />
                      {property.area} sq ft
                    </span>
                  </div>

                  <div className="card-type">
                    {property.type}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="empty">
              No sample homes match these filters. Try another
              state, budget or property type.
            </div>
          )}

          <div className="results-foot">
            <span>
              SHOWING {visible.length} OF {properties.length} SAMPLE HOMES
            </span>

            <button
              className="text-link"
              onClick={resetFilters}
            >
              Reset filters
              <X size={14} />
            </button>
          </div>
        </section>

        {/* ABOUT SECTION */}

        <section className="story section" id="story">
          <div className="story-image reveal">
            <img
              src={image('independent-home.webp')}
              alt="Contemporary independent Indian family home"
              loading="lazy"
            />

            <div className="image-stamp">
              HOMES FOR
              <br />
              <b>REAL LIFE</b>
            </div>
          </div>

          <div className="story-copy reveal">
            <div className="eyebrow">
              <i />
              A MORE INCLUSIVE APPROACH
            </div>

            <h2>
              Not just mansions.
              <br />
              <em>Real homes.</em>
            </h2>

            <p>
              Finding a home is personal. Some buyers need a compact
              apartment near work; others want an independent family
              home, and some are looking for a spacious villa. RoyalNest
              is a concept for exploring different home types and
              budgets across Indian states and union territories.
            </p>

            <div className="stats">
              <div>
                <b>36</b>
                <small>States & UTs listed</small>
              </div>

              <div>
                <b>3</b>
                <small>Home categories</small>
              </div>

              <div>
                <b>₹</b>
                <small>Indian pricing format</small>
              </div>
            </div>

            <button
              className="text-link"
              onClick={() => scrollTo('#properties')}
            >
              Explore sample homes
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        {/* SERVICES SECTION */}

        <section className="services section" id="services">
          <div className="center-heading reveal">
            <div className="eyebrow">
              <i />
              DESIGNED AROUND YOUR SEARCH
              <i />
            </div>

            <h2>
              Clear choices.
              <br />
              <em>Thoughtful guidance.</em>
            </h2>
          </div>

          <div className="service-grid">
            <div className="service reveal">
              <KeyRound />

              <h3>Explore by budget</h3>

              <p>
                Compare sample homes from compact first-home options
                to larger family properties.
              </p>
            </div>

            <div className="service reveal">
              <ShieldCheck />

              <h3>Make informed choices</h3>

              <p>
                Review the home type, location, area and listed
                features before arranging a visit.
              </p>
            </div>

            <div className="service reveal">
              <Building2 />

              <h3>Different ways to live</h3>

              <p>
                Explore apartments, independent houses and villas —
                not only high-end properties.
              </p>
            </div>
          </div>
        </section>

        {/* EMI CALCULATOR */}

        <section className="calculator section" id="calculator">
          <div className="calc-copy reveal">
            <div className="eyebrow">
              <i />
              PLAN WITH CLARITY
            </div>

            <h2>
              Estimate your
              <br />
              <em>monthly EMI.</em>
            </h2>

            <p>
              Adjust the sample property price, down payment and
              loan term to estimate a monthly repayment. This is
              an illustration, not a loan offer.
            </p>
          </div>

          <div className="calc-panel reveal">
            <div className="calc-head">
              <span>
                <Calculator size={17} />
                HOME LOAN ESTIMATOR
              </span>

              <IndianRupee size={18} />
            </div>

            <label>
              Property price

              <strong>{inr(budget)}</strong>

              <input
                type="range"
                min="1000000"
                max="50000000"
                step="100000"
                value={budget}
                onChange={(event) =>
                  setBudget(Number(event.target.value))
                }
              />
            </label>

            <label>
              Down payment

              <strong>{deposit}%</strong>

              <input
                type="range"
                min="5"
                max="70"
                step="5"
                value={deposit}
                onChange={(event) =>
                  setDeposit(Number(event.target.value))
                }
              />
            </label>

            <label>
              Loan term

              <strong>{years} years</strong>

              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={years}
                onChange={(event) =>
                  setYears(Number(event.target.value))
                }
              />
            </label>

            <div className="estimate">
              <small>ESTIMATED MONTHLY EMI*</small>

              <b>{inr(Math.round(emi()))}</b>

              <span>
                *Illustrative calculation at 8.5% annual interest.
                Actual rates, eligibility, taxes, insurance and fees
                vary by lender.
              </span>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}

        <section className="contact section" id="contact">
          <div className="contact-inner reveal">
            <div className="eyebrow">
              <i />
              START YOUR HOME SEARCH
            </div>

            <h2>
              Let's find
              <br />
              <em>your place.</em>
            </h2>

            <p>
              Share your preferred location and home type. This demo
              enquiry form shows the intended experience; it is not
              connected to a live sales team.
            </p>

            <button
              className="gold-btn"
              onClick={() => setBooking(true)}
            >
              Send an enquiry
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <footer>
        <a className="brand" href="#home">
          <span className="brand-mark">
            <Home size={24} />
          </span>

          <span>
            ROYALNEST
            <small>INDIAN HOMES. BETTER LIVING.</small>
          </span>
        </a>

        <span>
          © 2026 ROYALNEST · PORTFOLIO CONCEPT · SAMPLE LISTINGS
        </span>

        <div>
          <a href="#properties">Homes</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>

      {/* PROPERTY DETAILS MODAL */}

      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="property-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X />
            </button>

            <img
              src={selected.image}
              alt={selected.name}
            />

            <div className="modal-body">
              <div className="eyebrow">
                <i />
                {selected.tag.toUpperCase()}
              </div>

              <h2>{selected.name}</h2>

              <p className="card-location">
                <MapPin size={14} />
                {selected.city}, {selected.state}
              </p>

              <div className="price">
                {inr(selected.price)}
              </div>

              <p>{selected.desc}</p>

              <div className="feature-list">
                {selected.features.map((feature) => (
                  <span key={feature}>
                    <Check size={14} />
                    {feature}
                  </span>
                ))}
              </div>

              <button
                className="gold-btn"
                onClick={() => {
                  setSelected(null);
                  setBooking(true);
                }}
              >
                Request a viewing
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ENQUIRY MODAL */}

      {booking && (
        <div
          className="modal-backdrop"
          onClick={() => setBooking(false)}
        >
          <form
            className="booking-modal"
            onSubmit={submitBooking}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setBooking(false)}
              aria-label="Close"
            >
              <X />
            </button>

            <div className="eyebrow">
              <i />
              HOME ENQUIRY
            </div>

            <h2>
              Tell us what
              <br />
              <em>you're looking for.</em>
            </h2>

            <p>
              Demo enquiry form. No information is sent to a server.
            </p>

            <label>
              Your name
              <input
                required
                name="name"
                placeholder="Full name"
              />
            </label>

            <label>
              Email address
              <input
                required
                name="email"
                type="email"
                placeholder="you@example.com"
              />
            </label>

            <label>
              Preferred state / UT

              <select
                name="preferredState"
                defaultValue="Punjab"
              >
                {states.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label>
              Home type

              <select
                name="homeType"
                defaultValue="Any type"
              >
                <option>Any type</option>

                {propertyTypes.slice(1).map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>

            <label>
              Approximate budget

              <input
                required
                name="budget"
                placeholder="e.g. ₹50 lakh"
              />
            </label>

            <button
              className="gold-btn"
              type="submit"
            >
              Submit demo enquiry
              <ArrowRight size={16} />
            </button>

            <small>
              For a live site, connect this form to a secure
              backend or CRM.
            </small>
          </form>
        </div>
      )}

      {/* SAVED PROPERTIES MODAL */}

      {showFav && (
        <div
          className="modal-backdrop"
          onClick={() => setShowFav(false)}
        >
          <div
            className="booking-modal saved-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowFav(false)}
              aria-label="Close"
            >
              <X />
            </button>

            <div className="eyebrow">
              <i />
              YOUR SHORTLIST
            </div>

            <h2>
              Saved <em>homes.</em>
            </h2>

            {favoriteProperties.length === 0 ? (
              <p>
                You haven't saved any homes yet. Tap the heart on
                a property card to add one here.
              </p>
            ) : (
              favoriteProperties.map((property) => (
                <button
                  className="saved-row"
                  key={property.id}
                  onClick={() => {
                    setShowFav(false);
                    setSelected(property);
                  }}
                >
                  <img
                    src={property.image}
                    alt=""
                  />

                  <span>
                    <b>{property.name}</b>

                    <small>
                      {property.city}, {property.state} ·{' '}
                      {shortINR(property.price)}
                    </small>
                  </span>

                  <ArrowUpRight size={16} />
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* NOTIFICATION */}

      {toast && (
        <div className="toast">
          <Check size={16} />
          {toast}
        </div>
      )}

      {/* BACK TO TOP */}

      <button
        className="back-top"
        onClick={() => scrollTo('#home')}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}

// APPLICATION ENTRY POINT

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
