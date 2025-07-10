'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );

    // Features animation
    gsap.fromTo(
      featuresRef.current?.children || [],
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out",
        stagger: 0.2,
        delay: 0.5
      }
    );

    // CTA animation
    gsap.fromTo(
      ctaRef.current,
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1.2, 
        ease: "back.out(1.7)",
        delay: 1
      }
    );
  }, []);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white drop-shadow-lg">
            CityLights
          </div>
          <div className="flex gap-4">
            <Link 
              href="/signin"
              className="px-6 py-2 text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Sign In
            </Link>
            <Link 
              href="/signup"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 font-semibold shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div ref={heroRef} className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6 drop-shadow-2xl">
            Welcome to
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
              CityLights
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
            Experience the future of authentication with our beautiful, secure, and lightning-fast platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transform"
            >
              Start Your Journey
            </Link>
            <Link 
              href="/signin"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-semibold text-lg backdrop-blur-sm hover:scale-105 transform"
            >
              Already a Member?
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 drop-shadow-lg">
            Why Choose CityLights?
          </h2>
          <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105 transform">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure Authentication</h3>
              <p className="text-white/80">
                Enterprise-grade security with Firebase Authentication and advanced encryption.
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105 transform">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-white/80">
                Built with Next.js 15 and optimized for performance and speed.
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 hover:scale-105 transform">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Beautiful Design</h3>
              <p className="text-white/80">
                Stunning UI with smooth animations and modern glassmorphism effects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 px-4">
        <div ref={ctaRef} className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of users who trust CityLights for their authentication needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup"
                className="px-10 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transform"
              >
                Create Account
              </Link>
              <Link 
                href="/signin"
                className="px-10 py-4 border-2 border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-semibold text-lg backdrop-blur-sm hover:scale-105 transform"
              >
                Sign In Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold text-white drop-shadow-lg">
              CityLights
            </div>
            <div className="flex gap-8 text-white/80">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20 text-white/60">
            <p>&copy; 2025 CityLights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
