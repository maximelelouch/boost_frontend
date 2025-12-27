"use client";

import React, { useState, useRef } from 'react';
import { 
  X, Image as ImageIcon, Smile, MapPin, 
  Globe, Users, ChevronDown, Rocket 
} from 'lucide-react';
import { Avatar } from "@/components/ui/Avatar"; 

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  // --- ÉTATS ---
  const [text, setText] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [isBoostEnabled, setIsBoostEnabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // --- LOGIQUE ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      const newUrls = files.map(file => URL.createObjectURL(file));
      setMedia(prev => [...prev, ...newUrls]);
    }
  };

  const removeMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  // --- RENDU ---
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      
      {/* Container Principal */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* --- Header --- */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Créer une publication</h2>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* --- Body (Scrollable) --- */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-purple-100">
          
          {/* User Info & Privacy */}
          <div className="flex items-center gap-3 mb-6">
            
            {/* --- CORRECTION APPLIQUÉE ICI --- */}
            {/* On utilise une div pour le style (taille, bordure) au lieu de props sur Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-50 flex-shrink-0">
               <Avatar alt="Antoine" /> 
            </div>
            {/* ------------------------------- */}

            <div>
              <h3 className="font-bold text-gray-900">Antoine Emmanuel</h3>
              <div className="flex items-center gap-2 mt-1">
                <button className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-xs font-semibold hover:bg-purple-100 transition">
                  <Globe size={10} /> Public <ChevronDown size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* Zone de texte */}
          <textarea
            placeholder="Partagez un message avec nous "
            className="w-full text-lg placeholder:text-gray-400 border-none focus:ring-0 resize-none min-h-[100px] outline-none text-gray-800"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />

          {/* Zone Média (Grid dynamique) */}
          {media.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-6 mt-4">
              {media.map((url, idx) => (
                <div key={idx} className={`relative group rounded-xl overflow-hidden ${media.length === 1 ? 'col-span-2 h-64' : 'h-40'}`}>
                  <img src={url} alt="Media" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeMedia(idx)}
                    className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          

        </div>

        {/* --- Footer & Outils --- */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center justify-between mb-4">
             <span className="text-sm font-medium text-gray-500">Ajouter à votre publication</span>
             <div className="flex gap-1">
                <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-gray-100 rounded-full transition text-green-600">
                   <ImageIcon size={24} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition text-blue-500">
                   <Users size={24} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition text-yellow-500">
                   <Smile size={24} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition text-red-500">
                   <MapPin size={24} />
                </button>
             </div>
             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple onChange={handleFileChange} />
          </div>

          <button className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
            ${isBoostEnabled 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-purple-200 hover:shadow-purple-300' 
              : 'bg-purple-600 hover:bg-purple-700 shadow-purple-100'}`}
          >
            {isBoostEnabled ? (
               <>
                 <Rocket size={18} className="fill-white/20" /> Publier & Booster
               </>
            ) : "Publier"}
          </button>
        </div>

      </div>
    </div>
  );
}