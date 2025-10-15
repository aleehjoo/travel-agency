import { Meta, Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Tourvisto - Discover Your Next Adventure | Travel Planning Made Easy" },
    { name: "description", content: "Plan unforgettable trips with Tourvisto. Create custom itineraries, discover amazing destinations, and manage your travel bookings all in one place. Start your next adventure today!" },
    { name: "keywords", content: "travel planning, trip itinerary, vacation planning, travel agency, adventure travel, custom trips, travel dashboard" },
    
    // Open Graph
    { property: "og:title", content: "Tourvisto - Discover Your Next Adventure" },
    { property: "og:description", content: "Plan unforgettable trips with Tourvisto. Create custom itineraries, discover amazing destinations, and manage your travel bookings all in one place." },
    { property: "og:image", content: "/assets/images/hero-img.png" },
    { property: "og:url", content: "https://tourvisto.com" },
    
    // Twitter
    { name: "twitter:title", content: "Tourvisto - Discover Your Next Adventure" },
    { name: "twitter:description", content: "Plan unforgettable trips with Tourvisto. Create custom itineraries, discover amazing destinations, and manage your travel bookings all in one place." },
    { name: "twitter:image", content: "/assets/images/hero-img.png" },
    
    // Canonical
    { rel: "canonical", href: "https://tourvisto.com" },
  ];
};

const TravelPage = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "Tourvisto",
        "description": "Plan unforgettable trips with Tourvisto. Create custom itineraries, discover amazing destinations, and manage your travel bookings all in one place.",
        "url": "https://tourvisto.com",
        "logo": "https://tourvisto.com/assets/icons/logo.svg",
        "image": "https://tourvisto.com/assets/images/hero-img.png",
        "telephone": "+1-800-TOURVISTO",
        "email": "info@tourvisto.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Travel Street",
            "addressLocality": "San Francisco",
            "addressRegion": "CA",
            "postalCode": "94102",
            "addressCountry": "US"
        },
        "sameAs": [
            "https://www.facebook.com/tourvisto",
            "https://www.twitter.com/tourvisto",
            "https://www.instagram.com/tourvisto"
        ],
        "serviceType": "Travel Planning and Booking",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Travel Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom Trip Planning",
                        "description": "Personalized travel itineraries tailored to your preferences"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Travel Booking Management",
                        "description": "Complete booking management for flights, hotels, and activities"
                    }
                }
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <div className="travel-hero">
                <div>
                    <section className="mx-auto max-w-6xl px-6">
                        <article>
                            <h1 className="text-3xl md:text-5xl font-semibold text-white drop-shadow-md">
                                Discover your next adventure
                            </h1>
                            <p className="text-white/90 drop-shadow text-lg md:text-xl max-w-3xl">
                                Plan trips, manage bookings, and get insights in your dashboard. Start exploring today.
                            </p>
                            
                            {/* Call to action buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link 
                                    to="/sign-in" 
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                                    aria-label="Sign in to start planning your trip"
                                >
                                    Get Started
                                </Link>
                                <a 
                                    href="#features" 
                                    className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-semibold backdrop-blur"
                                    aria-label="Learn more about our features"
                                >
                                    Learn More
                                </a>
                            </div>
                        </article>
                    </section>
                </div>
            </div>
            
            {/* Features section for better content structure */}
            <section id="features" className="py-16 bg-white">
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Why Choose Tourvisto?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <img src="/assets/icons/itinerary.svg" alt="Custom itineraries" className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Custom Itineraries</h3>
                            <p className="text-gray-600">Create personalized travel plans tailored to your interests and preferences.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <img src="/assets/icons/calendar.svg" alt="Easy booking" className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                            <p className="text-gray-600">Manage all your travel bookings in one convenient dashboard.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <img src="/assets/icons/star.svg" alt="Expert insights" className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Expert Insights</h3>
                            <p className="text-gray-600">Get data-driven recommendations and travel analytics.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default TravelPage;
