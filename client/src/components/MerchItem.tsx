import React from "react";
import { MerchItem as MerchItemType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MerchItemProps {
  item: MerchItemType;
}

const MerchItem: React.FC<MerchItemProps> = ({ item }) => {
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
      duration: 3000,
    });
  };

  return (
    <div className="bg-navy/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
      <div className="relative overflow-hidden">
        <div className="w-full h-80 bg-navy/50 flex items-center justify-center overflow-hidden">
          <svg
            className="w-full h-full object-cover text-orange/20 transition-transform duration-500 group-hover:scale-105"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M30 30H70V70H30V30Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M40 40H60V60H40V40Z"
              fill="currentColor"
              opacity="0.5"
            />
            <path
              d="M45 45H55V55H45V45Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-dark/80 text-light py-2 px-4">
          <span className="text-orange font-bold">{item.price}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
        <p className="text-light/70 text-sm mb-3">{item.description}</p>
        <Button 
          className="w-full py-2 bg-orange text-dark font-semibold rounded-md hover:bg-orange/90 transition-colors orbitron text-sm"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  );
};

export default MerchItem;
