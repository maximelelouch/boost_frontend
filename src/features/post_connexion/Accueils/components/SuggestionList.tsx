import React from "react";
import { X, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import Image from "next/image";

// Données fictives basées sur ton image
const SUGGESTIONS = [
  { name: "A", mutual: 3 },
  { name: "E", mutual: 1 },
  { name: "E", mutual: 8 },
];

export const SuggestionList = () => {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-center mb-4 text-gray-500">
        <h3 className="font-semibold text-purple-600">Personnes que vous pourriez connaître</h3>
        <MoreHorizontalIcon />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {SUGGESTIONS.map((person, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
            {/* Zone Image */}
            <div className="h-48 bg-gray-200 relative">
               <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white cursor-pointer hover:bg-black/70">
                 <X size={16} />
               </div>
               {/* Image Placeholder */}
               <Image
                 src={`https://api.dicebear.com/7.x/initials/svg?seed=${person.name}`}
                 alt={person.name}
                 fill
                 className="object-cover"
               />
            </div>
            
            {/* Zone Infos */}
            <div className="p-3 flex flex-col gap-2 flex-1 justify-between">
              <div>
                  <h4 className="font-semibold">{person.name}</h4>
                  <p className="text-xs text-gray-500">{person.mutual} ami(e)s en commun</p>
              </div>
              <button className="flex items-center justify-center gap-2 w-full bg-purple-100 text-purple-600 hover:bg-purple-200 font-medium py-2 rounded-md transition text-sm">
                <UserPlus size={16} className="text-purple-600" />
                Ajouter ami(e)
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full text-purple-500 font-medium py-2 mt-2 hover:bg-gray-50 rounded text-sm">
          Voir tout
      </button>
    </Card>
  );
};

const MoreHorizontalIcon = () => <span className="text-xl pb-2">...</span>;