
import React from 'react';
import { Star, MapPin, Shield, Eye, ShoppingCart, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface ProductCardProps {
  product: any;
  onSelect: () => void;
  onOrderNow: () => void;
  onViewTrace: () => void;
  userRole: string | null;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onOrderNow,
  onViewTrace,
  userRole
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      <div onClick={onSelect} className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.verified && (
          <Badge className="absolute top-3 left-3 bg-green-500 text-white">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-sm font-medium">
          {product.traceSteps} steps
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              ${product.price}
            </div>
            <div className="text-sm text-gray-500">per {product.unit}</div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {product.location}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">by {product.farmer}</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">{product.quantity} {product.unit}</span> available
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onViewTrace}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            Trace
          </Button>
          
          {userRole === 'buyer' ? (
            <Button
              onClick={onOrderNow}
              size="sm"
              className="flex-1 bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Order
            </Button>
          ) : userRole === 'transporter' ? (
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
            >
              <Truck className="w-4 h-4 mr-2" />
              Transport
            </Button>
          ) : (
            <Button
              onClick={onOrderNow}
              size="sm"
              className="flex-1 bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600"
            >
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
