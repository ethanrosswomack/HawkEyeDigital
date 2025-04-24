import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MerchItem as MerchItemType } from "@shared/schema";
import MerchItem from "../components/MerchItem";
import { Button } from "@/components/ui/button";

const Merch: React.FC = () => {
  const { data: merchItems, isLoading } = useQuery<MerchItemType[]>({
    queryKey: ["/api/merch"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-dark pt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 orbitron text-light">
            OFFICIAL <span className="text-orange">MERCH</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Wear the message. Exclusive designs inspired by the themes and artwork
            from Hawk Eye's music.
          </p>
          <div className="w-24 h-1 bg-orange mx-auto mt-6"></div>
        </div>

        <div className="mb-12 bg-navy/20 p-6 md:p-8 rounded-lg border border-navy/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 orbitron text-orange">NEW ARRIVALS</h2>
              <p className="mb-6">
                Fresh designs inspired by the "Mixtape Sessions" trilogy. Each piece
                is crafted to reflect the themes of truth seeking, justice, and
                steadfastness that define Hawk Eye's music.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange rounded-full mr-3"></div>
                  <p>Limited edition designs</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange rounded-full mr-3"></div>
                  <p>Ethically produced apparel</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange rounded-full mr-3"></div>
                  <p>High-quality screen printing</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange rounded-full mr-3"></div>
                  <p>Worldwide shipping available</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple to-orange rounded-xl blur-xl opacity-30"></div>
              <div className="relative z-10 bg-navy/40 p-6 rounded-lg border border-navy/60 text-center">
                <h3 className="text-xl font-bold mb-3 orbitron">TRILOGY BUNDLE</h3>
                <p className="mb-4">Get all three album-themed t-shirts for a discounted price</p>
                <p className="text-3xl font-bold text-orange mb-4">$75.00</p>
                <p className="text-sm text-light/60 mb-6">Save $15 compared to individual purchase</p>
                <Button className="px-6 py-3 bg-orange text-dark font-semibold rounded-md hover:bg-orange/90 transition-colors orbitron">
                  ADD BUNDLE TO CART
                </Button>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-orange rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {merchItems?.map((item) => (
              <MerchItem key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="mt-16 space-y-12">
          <div className="bg-navy/30 p-6 md:p-8 rounded-lg border border-navy/50">
            <h2 className="text-2xl font-bold mb-6 orbitron text-orange text-center">SIZING GUIDE</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy/50">
                    <th className="text-left pb-2 font-bold">Size</th>
                    <th className="text-center pb-2 font-bold">Chest (inches)</th>
                    <th className="text-center pb-2 font-bold">Length (inches)</th>
                    <th className="text-center pb-2 font-bold">Sleeve (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-navy/30">
                    <td className="py-2">Small</td>
                    <td className="text-center py-2">38-40</td>
                    <td className="text-center py-2">27</td>
                    <td className="text-center py-2">8</td>
                  </tr>
                  <tr className="border-b border-navy/30">
                    <td className="py-2">Medium</td>
                    <td className="text-center py-2">40-42</td>
                    <td className="text-center py-2">28</td>
                    <td className="text-center py-2">8.5</td>
                  </tr>
                  <tr className="border-b border-navy/30">
                    <td className="py-2">Large</td>
                    <td className="text-center py-2">42-44</td>
                    <td className="text-center py-2">29</td>
                    <td className="text-center py-2">9</td>
                  </tr>
                  <tr className="border-b border-navy/30">
                    <td className="py-2">X-Large</td>
                    <td className="text-center py-2">44-46</td>
                    <td className="text-center py-2">30</td>
                    <td className="text-center py-2">9.5</td>
                  </tr>
                  <tr>
                    <td className="py-2">XX-Large</td>
                    <td className="text-center py-2">46-48</td>
                    <td className="text-center py-2">31</td>
                    <td className="text-center py-2">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-navy/30 p-6 md:p-8 rounded-lg border border-navy/50">
            <h2 className="text-2xl font-bold mb-6 orbitron text-orange text-center">SHIPPING & RETURNS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Shipping Information</h3>
                <ul className="space-y-2">
                  <li>• Domestic orders (US): 3-5 business days</li>
                  <li>• International orders: 7-14 business days</li>
                  <li>• Free shipping on orders over $50</li>
                  <li>• Tracking provided for all orders</li>
                  <li>• Items ship within 48 hours of order placement</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Return Policy</h3>
                <ul className="space-y-2">
                  <li>• 30-day return window for unworn items</li>
                  <li>• Exchange or refund available</li>
                  <li>• Buyer responsible for return shipping</li>
                  <li>• Contact support for return authorization</li>
                  <li>• Limited edition items are final sale</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button className="px-8 py-4 bg-gradient-to-r from-purple to-darkred text-light font-semibold rounded-md hover:opacity-90 transition-opacity orbitron">
            VISIT FULL MERCH STORE <i className="fas fa-shopping-cart ml-2"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Merch;
