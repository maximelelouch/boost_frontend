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

      <div className="flex justify-center px-4">
        <button
          aria-label="Créer une page"
          className="flex items-center gap-2 justify-center w-full max-w-xs mx-auto bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-purple-700 transition"
        >
          <Video size={20} className="text-white" />
          <span className="text-sm">Créer une page</span>
        </button>
      </div>
    </Card>
  );
};