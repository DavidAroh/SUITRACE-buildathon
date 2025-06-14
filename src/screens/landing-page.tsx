import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, MapPin, Clock, Award } from 'lucide-react';
import { Button } from "../components/ui/button";

export const Homepage = () => {
    const features = [
        "Verified Farms",
        "Trusted Sellers",
        "Product Reviews",
        "Traceable Origin",
        "Real-time Updates",
    ];

    const products = [
        {
            name: "Organic Strawberries",
            price: "$5.99",
            location: "Lagos",
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
        },
        {
            name: "Fresh Okra",
            price: "$2.99",
            location: "Abuja",
            rating: 4.2,
            image: "https://images.unsplash.com/photo-1635821782454-5b509cd7635b",
        },
        {
            name: "Sweet Potatoes",
            price: "$4.50",
            location: "Enugu",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
        },
        {
            name: "Fresh Ginger",
            price: "$3.99",
            location: "Jos",
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1615485293361-7e8e17631ce1",
        },
        {
            name: "Yam Tuber",
            price: "$7.99",
            location: "Benue",
            rating: 4.3,
            image: "https://img.freepik.com/free-photo/yam-root_1339-6581.jpg",
        },
        {
            name: "Tiger Nuts",
            price: "$2.50",
            location: "Kaduna",
            rating: 4.1,
            image: "https://img.freepik.com/free-photo/healthy-organic-tigernuts-closeup_23-2149183703.jpg",
        },
        {
            name: "Mushrooms",
            price: "$6.00",
            location: "Ibadan",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1615484477781-6fa7b38b8c88",
        },
    ];

    const categories = [
        {
            name: "Meat",
            image: "https://images.unsplash.com/photo-1606756797930-c1ec4200c3ae",
        },
        {
            name: "Yam",
            image: "https://img.freepik.com/free-photo/yam-root_1339-6581.jpg",
        },
        {
            name: "Fruits",
            image: "https://images.unsplash.com/photo-1582501950864-4183c7b29f34",
        },
        {
            name: "Seafood",
            image: "https://images.unsplash.com/photo-1612197592828-d0163e11183e",
        },
        {
            name: "Vegetables",
            image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
        },
        {
            name: "Spices",
            image: "https://images.unsplash.com/photo-1587049352840-b285f918a7c1",
        },
    ];

    return (
        <div className="font-sans bg-[#fdfcf7] text-gray-800">
            {/* Header */}
            <header className="bg-white shadow fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-green-600">SuiTrace</h1>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded px-4 py-2 w-1/2"
                    />

                    <Link to={"/sign-in"}>
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            Login
                        </button>
                    </Link>
                </div>
            </header>

            {/* Spacer */}
            <div className="h-10" />

            {/* Hero */}
            <div className="relative bg-gradient-to-br from-green-600 via-green-500 to-orange-500 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            From Farm to Table
                            <br />
                            <span className="text-orange-200">Fully Traced</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
                            Revolutionary blockchain marketplace connecting African farmers directly to buyers
                            with complete supply chain transparency and smart contract security.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Button
                                size="lg"
                                className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold"
                            >
                                Start Trading
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
                            >
                                Learn More
                            </Button>
                        </div>

                        {/* Trust Features */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                            <div className="flex flex-col items-center">
                                <Shield className="w-8 h-8 mb-2 text-orange-200" />
                                <span className="text-sm font-medium">Smart Escrow</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <MapPin className="w-8 h-8 mb-2 text-orange-200" />
                                <span className="text-sm font-medium">Full Traceability</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Clock className="w-8 h-8 mb-2 text-orange-200" />
                                <span className="text-sm font-medium">Real-time Tracking</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Award className="w-8 h-8 mb-2 text-orange-200" />
                                <span className="text-sm font-medium">Verified Quality</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <section className="bg-white py-8">
                <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                    {features.map((feature, idx) => (
                        <div key={idx}>
                            <div className="text-green-600 text-2xl">✔</div>
                            <p className="text-sm font-medium mt-1">{feature}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-10 px-4">
                <h3 className="text-2xl font-semibold text-center mb-6">Featured Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {products.map((item, idx) => (
                        <div key={idx} className="bg-white border rounded shadow">
                            <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded-t" />
                            <div className="p-4">
                                <h4 className="font-bold text-lg">{item.name}</h4>
                                <p className="text-sm text-gray-600">{item.location}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-green-600 font-semibold">{item.price}</span>
                                    <span className="text-yellow-500 text-sm">★ {item.rating}</span>
                                </div>
                                <button className="mt-4 bg-green-500 text-white w-full py-2 rounded hover:bg-green-600">
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section className="py-10 px-4 bg-white">
                <h3 className="text-2xl font-semibold text-center mb-6">Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="text-center">
                            <img src={cat.image} alt={cat.name} className="h-24 w-full object-cover rounded-md" />
                            <p className="mt-2 text-sm font-medium">{cat.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#fdfcf7] border-t mt-10 py-10 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="text-xl font-bold text-green-600">SuiTrace</h4>
                        <p className="text-sm mt-2">From Farm to Table</p>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-2">Contact Us</h5>
                        <p className="text-sm">Email: support@suitrace.com</p>
                        <p className="text-sm">Phone: +234 800 000 0000</p>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-2">Subscribe</h5>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="border px-4 py-2 rounded"
                            />
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;
