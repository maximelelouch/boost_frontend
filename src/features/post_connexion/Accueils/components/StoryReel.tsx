import React from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";

export const StoryReel = () => {
  return (
    <Card className="flex mb-6 overflow-hidden relative h-48 sm:h-64 cursor-pointer">
       {/* Story Création (La carte avec le +) */}
       <div className="w-32 sm:w-40 flex-shrink-0 relative group">
          <div className="h-3/4 bg-gray-200 relative">
             {/* Simule l'image de profil en grand */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
          </div>
          <div className="h-1/4 bg-white relative flex flex-col items-center justify-end pb-2">
             <div className="absolute -top-5 bg-blue-500 text-white p-1 rounded-full border-4 border-white">
                <Plus size={24} />
             </div>
             <span className="text-sm font-semibold">Créer une story</span>
          </div>
       </div>
       
       <div className="flex-1 p-4 flex items-center justify-center text-gray-500 text-sm">
           Partagez une photo ou un message.
       </div>
    </Card>
  );
};