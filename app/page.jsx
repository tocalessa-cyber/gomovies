"use client";

import React from 'react';
import Link from 'next/link';
import { FaHome, FaFilm, FaTv, FaSearch, FaStar, FaUsers, FaGlobe, FaUser, FaCalendar, FaTrophy } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-900/50 to-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-5 text-orange-400">
            Gomovies123 - Ultimate Movie & TV Series Database
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Your comprehensive guide to 10,000+ movies, 5,000+ TV series, actor profiles, genre pages, and streaming information.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/movie/popular" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <FaFilm /> Browse Movies
            </Link>
            <Link href="/tv-show/popular" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <FaTv /> Browse TV Series
            </Link>
            <Link href="/people" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <FaUser /> Explore Actors
            </Link>
            <Link href="/rankings" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <FaTrophy /> Top Rankings
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm">
          {/* Introduction */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <img
                src="https://live.staticflickr.com/65535/54796879356_0cf11547b4_b.jpg"
                alt="Movie reels and cinema tickets - Ultimate movie database"
                width={1024}
                height={416}
                className="rounded-xl shadow-2xl mx-auto mb-8"
              />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-300">
                Discover the World of Cinema with Gomovies123
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Gomovies123 is United America's most complete movie and TV series information platform. 
                We provide accurate data, user reviews, streaming guides, actor profiles, and comprehensive genre archives.
              </p>
            </div>
          </section>

          {/* Features Grid - DIPERBARUI */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center text-orange-300">
              Complete Movie Database Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-700/50 p-6 rounded-xl text-center">
                <FaFilm className="text-4xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Movie Details</h3>
                <p className="text-gray-400">Complete information, cast, reviews, and streaming availability</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-xl text-center">
                <FaTv className="text-4xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Genre Pages</h3>
                <p className="text-gray-400">Explore movies and TV series by specific genres</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-xl text-center">
                <FaUser className="text-4xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Actor Profiles</h3>
                <p className="text-gray-400">Detailed actor information with filmography</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-xl text-center">
                <FaCalendar className="text-4xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Year Archives</h3>
                <p className="text-gray-400">Browse movies by release year and decades</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-xl text-center">
                <FaTrophy className="text-4xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Top Rankings</h3>
                <p className="text-gray-400">Highest rated movies and TV series</p>
              </div>
              <div className="bg-gray-700/50 p-6 rounded-xl text-center">
                <FaSearch className="text-4xl text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Advanced Search</h3>
                <p className="text-gray-400">Find content by multiple criteria and filters</p>
              </div>
            </div>
          </section>

          {/* Detailed Sections - DIPERBARUI */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-orange-300">Movie Details & Information</h3>
                <p className="text-gray-400 mb-4">
                  Get comprehensive details for every movie including:
                </p>
                <ul className="text-gray-400 space-y-2 mb-6">
                  <li>• Complete cast and crew information</li>
                  <li>• User reviews and ratings</li>
                  <li>• Streaming platform availability</li>
                  <li>• Trailers and official videos</li>
                  <li>• Similar movie recommendations</li>
                  <li>• Release dates and box office data</li>
                </ul>
                <Link href="/movie/popular" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  <FaFilm /> Explore Movies
                </Link>
              </div>
              <div className="bg-gray-700/30 p-6 rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Movie details and information interface"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-700/30 p-6 rounded-xl order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Actor profiles and filmography"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold mb-4 text-orange-300">Actor & People Profiles</h3>
                <p className="text-gray-400 mb-4">
                  Discover detailed information about your favorite actors:
                </p>
                <ul className="text-gray-400 space-y-2 mb-6">
                  <li>• Complete biography and personal details</li>
                  <li>• Full filmography with roles</li>
                  <li>• TV series appearances</li>
                  <li>• Awards and nominations</li>
                  <li>• Upcoming projects</li>
                  <li>• High-quality photos and media</li>
                </ul>
                <Link href="/people" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  <FaUser /> Browse Actors
                </Link>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-orange-300">Genre & Category Pages</h3>
                <p className="text-gray-400 mb-4">
                  Explore content organized by genres and categories:
                </p>
                <ul className="text-gray-400 space-y-2 mb-6">
                  <li>• Action, Drama, Comedy, Horror, and more</li>
                  <li>• Genre-specific recommendations</li>
                  <li>• Popular and trending by genre</li>
                  <li>• Cross-genre discovery</li>
                  <li>• TV series by genre</li>
                  <li>• New releases by category</li>
                </ul>
                <Link href="/movie/genre/action" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  <FaFilm /> Explore Genres
                </Link>
              </div>
              <div className="bg-gray-700/30 p-6 rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Movie genres and categories"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-700/30 p-6 rounded-xl order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Movie archives by year and decade"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold mb-4 text-orange-300">Year & Decade Archives</h3>
                <p className="text-gray-400 mb-4">
                  Travel through cinematic history with our archives:
                </p>
                <ul className="text-gray-400 space-y-2 mb-6">
                  <li>• Browse movies by release year</li>
                  <li>• Explore decades of cinema</li>
                  <li>• Historical movie collections</li>
                  <li>• Annual award winners</li>
                  <li>• Classic and vintage films</li>
                  <li>• Yearly box office hits</li>
                </ul>
                <Link href="/movie/year/2000" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  <FaCalendar /> Explore Archives
                </Link>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-orange-300">Top Rankings & Ratings</h3>
                <p className="text-gray-400 mb-4">
                  Discover the highest rated content across all categories:
                </p>
                <ul className="text-gray-400 space-y-2 mb-6">
                  <li>• Top rated movies of all time</li>
                  <li>• Highest rated TV series</li>
                  <li>• Popular by genre rankings</li>
                  <li>• User-rated favorites</li>
                  <li>• Critically acclaimed content</li>
                  <li>• Award-winning productions</li>
                </ul>
                <Link href="/rankings" className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  <FaTrophy /> View Rankings
                </Link>
              </div>
              <div className="bg-gray-700/30 p-6 rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Movie rankings and ratings"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12 bg-gradient-to-r from-orange-900/30 to-purple-900/30 rounded-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-300">
              Ready to Explore the World of Cinema?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of movie enthusiasts discovering new content daily on Gomovies123.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/movie/365-days-this-day-2022/stream" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2">
                <FaFilm /> Start Watching Movies
              </Link>
              <Link href="/tv-show/popular" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2">
                <FaTv /> Browse TV Series
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}