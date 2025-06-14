
import React from 'react';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  onProductSelect: (product: any) => void;
  onOrderNow: (product: any) => void;
  onViewTrace: (product: any) => void;
  userRole: string | null;
}

export const Productpage: React.FC<ProductGridProps> = ({
  onProductSelect,
  onOrderNow,
  onViewTrace,
  userRole
}) => {
  const mockProducts = [
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: 2.50,
      unit: 'kg',
      location: 'Kaduna, Nigeria',
      farmer: 'Amina Hassan',
      rating: 4.8,
      verified: true,
      quantity: 50,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
      traceSteps: 4,
      description: 'Fresh organic tomatoes grown using sustainable farming practices'
    },
    {
      id: '2',
      name: 'Fresh Yams',
      price: 1.80,
      unit: 'kg',
      location: 'Ogun, Nigeria',
      farmer: 'Ibrahim Musa',
      rating: 4.9,
      verified: true,
      quantity: 100,
      image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400',
      traceSteps: 3,
      description: 'Premium quality yams perfect for all your culinary needs'
    },
    {
      id: '3',
      name: 'Premium Maize',
      price: 1.20,
      unit: 'kg',
      location: 'Kano, Nigeria',
      farmer: 'Fatima Abdul',
      rating: 4.7,
      verified: true,
      quantity: 200,
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400',
      traceSteps: 5,
      description: 'High-quality maize grains for both consumption and processing'
    },
    {
      id: '4',
      name: 'Organic Peppers',
      price: 3.00,
      unit: 'kg',
      location: 'Plateau, Nigeria',
      farmer: 'Joseph Danladi',
      rating: 4.6,
      verified: false,
      quantity: 30,
      image: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9d3?w=400',
      traceSteps: 2,
      description: 'Spicy organic peppers grown in the Jos plateau'
    },
    {
      id: '5',
      name: 'Sweet Cassava',
      price: 0.80,
      unit: 'kg',
      location: 'Cross River, Nigeria',
      farmer: 'Grace Okon',
      rating: 4.9,
      verified: true,
      quantity: 150,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400',
      traceSteps: 3,
      description: 'Fresh cassava tubers with excellent taste and quality'
    },
    {
      id: '6',
      name: 'Vegetable Oil',
      price: 4.50,
      unit: 'liter',
      location: 'Rivers, Nigeria',
      farmer: 'Emmanuel Okoro',
      rating: 4.8,
      verified: true,
      quantity: 25,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      traceSteps: 6,
      description: 'Pure red palm oil extracted using traditional methods'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={() => onProductSelect(product)}
          onOrderNow={() => onOrderNow(product)}
          onViewTrace={() => onViewTrace(product)}
          userRole={userRole}
        />
      ))}
    </div>
  );
};
