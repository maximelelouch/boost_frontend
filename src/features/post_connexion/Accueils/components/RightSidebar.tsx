"use client";

import React from "react";
import { UserPlus, MoreHorizontal, Gift, Search, X } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar"; 

export const RightSidebar = () => {
  return (
    <aside className="hidden xl:block w-[300px] fixed right-0 top-14 h-[calc(100vh-56px)] overflow-y-auto p-4 scrollbar-hide">
      <div className="space-y-6">
        
        {/* --- 1. WIDGET GAMIFICATION --- */}
        <div className="bg-gradient-to-br from-[#9333ea] to-indigo-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group transition-all hover:shadow-purple-200 hover:shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-white/20 transition duration-500"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-10 -mb-10 blur-xl"></div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Gift size={20} className="text-white" />
                    </div>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                        Niveau 2
                    </span>
                </div>
                
                <h3 className="font-bold text-lg leading-tight mb-1">Profil complété à 75%</h3>
                <p className="text-purple-100 text-xs mb-3 opacity-90">Ajoutez votre université pour atteindre 100%.</p>
                
                <div className="w-full h-2 bg-black/20 rounded-full mb-4 overflow-hidden">
                    <div className="h-full bg-white w-[75%] shadow-[0_0_10px_rgba(255,255,255,0.5)] relative">
                        <div className="absolute inset-0 bg-white/50 w-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>
                
                <button className="w-full bg-white text-purple-700 font-bold py-2.5 rounded-xl text-sm hover:bg-purple-50 transition shadow-sm active:scale-95">
                    Compléter mon profil
                </button>
            </div>
        </div>

        {/* --- 2. SUGGESTIONS D'AMIS --- */}
        <div>
            <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="font-semibold text-gray-500 text-sm">Invitations</h3>
                <span className="text-purple-600 text-xs cursor-pointer hover:underline">Tout voir</span>
            </div>
            
            <div className="space-y-4">
                {/* Exemple d'invitation */}
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        {/* CORRECTION ICI : Div parent pour la taille */}
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                             <Avatar alt="Sarah" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-gray-900">Sarah Connor</h4>
                            <p className="text-xs text-gray-500">12 amis communs</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-2 rounded-lg transition">
                            Confirmer
                        </button>
                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2 rounded-lg transition">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* --- 3. PUBLICITÉ --- */}
        <div>
             <div className="flex justify-between items-center mb-2 px-1">
                <h3 className="font-semibold text-gray-500 text-sm">Sponsorisé</h3>
            </div>
            <div className="flex items-center gap-3 cursor-pointer group p-2 rounded-xl hover:bg-gray-100 transition">
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80" alt="Shoe" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-purple-600 transition-colors">Nike Air Max - Collection 2024</p>
                    <p className="text-xs text-gray-500 mt-1">nike.com</p>
                </div>
            </div>
        </div>

        {/* --- 4. CONTACTS --- */}
        <div className="pt-2 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="font-semibold text-gray-500 text-sm">Contacts</h3>
                <div className="flex gap-2 text-gray-400">
                    <Search size={16} className="cursor-pointer hover:text-gray-600" />
                    <MoreHorizontal size={16} className="cursor-pointer hover:text-gray-600" />
                </div>
            </div>

            <ul className="space-y-1">
                {['Jean Dupont', 'Marie Curie', 'Thomas Pesquet', 'Elon Musk'].map((name, i) => (
                    <li key={i} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition group">
                        <div className="relative">
                            {/* CORRECTION ICI : Div parent pour la taille */}
                            <div className="w-9 h-9 rounded-full overflow-hidden">
                                <Avatar alt={name} />
                            </div>
                            
                            {/* Point vert (En ligne) */}
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-black">{name}</span>
                    </li>
                ))}
            </ul>
        </div>

      </div>
    </aside>
  );
};