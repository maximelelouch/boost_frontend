import React from "react";
import { Video, Image as ImageIcon, Smile } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";

export const CreatePost = () => {
  return (
    <Card className="p-4 mb-4">
      <div className="flex gap-3 mb-4 border-b pb-4">
        <Avatar alt="Me" />
        <input 
          type="text" 
          placeholder="Quoi de neuf, Antoine ?" 
          className="flex-1 bg-gray-100 rounded-full px-4 hover:bg-gray-200 transition outline-none cursor-pointer"
        />
      </div>
      <div className="flex justify-between px-4">
        <button className="flex items-center gap-2 text-red-500 font-medium hover:bg-gray-100 px-4 py-2 rounded-lg transition">
          <Video size={24} />
          <span>Vidéo en direct</span>
        </button>
        <button className="flex items-center gap-2 text-green-500 font-medium hover:bg-gray-100 px-4 py-2 rounded-lg transition">
          <ImageIcon size={24} />
          <span>Photo/Vidéo</span>
        </button>
        <button className="flex items-center gap-2 text-yellow-500 font-medium hover:bg-gray-100 px-4 py-2 rounded-lg transition">
          <Smile size={24} />
          <span>Humeur/Activité</span>
        </button>
      </div>
    </Card>
  );
};