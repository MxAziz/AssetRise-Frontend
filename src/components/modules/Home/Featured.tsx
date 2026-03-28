"use client";

import Image from "next/image";
import { LucideRuler, LucideBedSingle, LucideBath, ArrowUpRight } from "lucide-react";

interface PropertyCard {
  id: number;
  price: string;
  title: string;
  location: string;
  sqft: string;
  beds: number;
  baths: number;
  image: string;
  showOverlay?: boolean;
}

const properties: PropertyCard[] = [
  {
    id: 1,
    price: "$3,800 pm",
    title: "Sunset Retreat",
    location: "Laguna Beach, CA",
    sqft: "300 sq ft",
    beds: 3,
    baths: 2,
    image: "/images/featured/featured1.png",
    showOverlay: true,
  },
  {
    id: 2,
    price: "$5,500 pm",
    title: "Urban Oasis",
    location: "New York, NY",
    sqft: "500 sq ft",
    beds: 1,
    baths: 1,
    image: "/images/featured/featured2.webp",
  },
  {
    id: 3,
    price: "$2,900 pm",
    title: "Garden Cottage",
    location: "Asheville, NC",
    sqft: "320 sq ft",
    beds: 1,
    baths: 1,
    image: "/images/featured/featured3.webp",
  },
  {
    id: 4,
    price: "$4,750 pm",
    title: "Skyline Loft",
    location: "Seattle, WA",
    sqft: "480 sq ft",
    beds: 2,
    baths: 2,
    image: "/images/featured/featured4.webp",
  },
  {
    id: 5,
    price: "$3,200 pm",
    title: "Historic Brownstone",
    location: "Boston, MA",
    sqft: "360 sq ft",
    beds: 1 as const,
    baths: 1,
    image: "/images/featured/featured5.webp",
  },
  {
    id: 6,
    price: "$6,000 pm",
    title: "Luxury Penthouse",
    location: "Miami, FL",
    sqft: "600 sq ft",
    beds: 3,
    baths: 3,
    image: "/images/featured/featured6.webp",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-8 mb-12">
          <div className="flex-1">
            {/* Light blue tag */}
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              (02) - TOP PICKS
            </div>

            {/* Main heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-3 leading-tight">
              Featured Properties
            </h2>

            {/* Subtext */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md">
              Carefully Selected Homes with High Value & Long-Term Returns
            </p>
          </div>

          {/* Explore All Properties Button */}
          <button
            className="mt-6 md:mt-0 inline-flex items-center justify-center gap-2 bg-black text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            aria-label="Explore all properties"
          >
            Explore All Properties
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group flex flex-col bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full h-64 md:h-56 lg:h-64 overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />

                {/* Black Overlay with Arrow Icon on First Card */}
                {property.showOverlay && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-6 h-6 text-black" strokeWidth={2.5} />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Content Section */}
              <div className="flex flex-col flex-1 p-5 md:p-4 lg:p-5">
                {/* Price */}
                <p className="text-lg md:text-base lg:text-lg font-bold text-black mb-1">
                  {property.price}
                </p>

                {/* Title */}
                <h3 className="text-lg md:text-base lg:text-lg font-semibold text-black mb-1">
                  {property.title}
                </h3>

                {/* Location */}
                <p className="text-sm text-gray-500 mb-4 flex-1">
                  {property.location}
                </p>

                {/* Card Footer - Icons and Details */}
                <div className="flex items-center gap-4 text-xs md:text-xs lg:text-sm text-gray-600 border-t border-gray-100 pt-4">
                  {/* Square Footage */}
                  <div className="flex items-center gap-1.5">
                    <LucideRuler className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                    <span>{property.sqft}</span>
                  </div>

                  {/* Beds */}
                  <div className="flex items-center gap-1.5">
                    <LucideBedSingle className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                    <span>{property.beds} Bed{property.beds !== 1 ? "s" : ""}</span>
                  </div>

                  {/* Baths */}
                  <div className="flex items-center gap-1.5">
                    <LucideBath className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                    <span>{property.baths} Bath{property.baths !== 1 ? "s" : ""}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
