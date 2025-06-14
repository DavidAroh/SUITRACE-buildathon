import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, MapPin, Clock, Award, TrendingUp, Users, Package } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Productpage } from "./ProductGrid";
export const Homepage = () => {
    const stats = [
        {
            icon: Package,
            value: '2,847',
            label: 'Products Traced',
            color: 'text-green-600'
        },
        {
            icon: Users,
            value: '1,234',
            label: 'Active Farmers',
            color: 'text-orange-600'
        },
        {
            icon: TrendingUp,
            value: '$89K',
            label: 'Monthly Volume',
            color: 'text-blue-600'
        },
        {
            icon: MapPin,
            value: '12',
            label: 'Countries',
            color: 'text-purple-600'
        }
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
                            <Link to={"/sign-in"}>
                             <Button
                                size="lg"
                                className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold"
                            >
                                Start Selling
                            </Button>
                            </Link>
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
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4 ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Products */}
            <section className="py-10 px-4">
                <h3 className="text-2xl font-semibold text-center mb-6">Featured Products</h3>
                <Productpage />
            </section>

            {/* Categories */}
            <section className="py-10 px-4 bg-white">
                <h3 className="text-2xl font-semibold text-center mb-6">Categories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden shadow-md h-48">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            {/* Full Overlay */}
                            <div className="absolute inset-0  flex items-center justify-center">
                                {/* Glassmorphic Text Container */}
                                <div className="bg-black/50 backdrop-blur-2xl rounded-full px-6 py-2">
                                    <p className="text-white text-lg font-semibold">{cat.name} Products</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>





            {/* Footer */}
            <footer className="bg-[#fdfcf7] border-t mt-10 py-10 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="text-xl font-bold text-green-600">SuiTrace</h4>
                        <p className="text-sm mt-2">Revolutionary blockchain marketplace connecting African farmers directly to buyers with
                            complete supply chain transparency and smart contract security.</p>
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
