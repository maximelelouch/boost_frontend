'use client';
import { useState } from 'react';
import React from "react";
import { Search, Home, Users, Store, MonitorPlay, Bell } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { LeftSidebar, RightSidebar } from "@/features/navigation";
import Homee from '@/features/post_connexion/Accueils/components/Homee';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number }>;

// Typage strict pour les ids d'onglet
type TabId = 'home' | 'users' | 'videos' | 'store' | 'friend';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-900 font-sans">
      
      {/* --- HEADER / NAVBAR --- */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white shadow-sm flex items-center justify-between px-4 z-50">
        {/* Partie Gauche : Logo + Recherche */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            Th
          </div>
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2">
            <Search className="text-gray-500 w-5 h-5" />
            <input type="text" placeholder="Rechercher sur Threadly" className="bg-transparent border-none outline-none ml-2 text-sm w-48" />
          </div>
        </div>

        {/* Partie Centre : Navigation Principale */}
        <nav className="hidden md:flex gap-1 h-full">
          <NavItem id="home" icon={Home} active={activeTab === 'home'} onClick={setActiveTab} />
          <NavItem id="users" icon={Users} active={activeTab === 'users'} onClick={setActiveTab} />
          
          <NavItem id="store" icon={Store} active={activeTab === 'store'} onClick={setActiveTab} />
        </nav>

        {/* Partie Droite : Actions Profil */}
        <div className="flex items-center gap-2">
           <div className="hidden lg:flex items-center gap-2 bg-blue-50 text-blue-600 font-medium px-3 py-1 rounded-full cursor-pointer">
             <span className="text-sm">Trouver vos ami(e)s</span>
           </div>
           
           <ActionIcon icon={Bell} />
           <Avatar size="sm" alt="Me" />
        </div>
      </header>

      {/* --- MAIN LAYOUT (3 Colonnes) --- */}
      <div className="pt-14 flex justify-center">
        
        {/* Colonne Gauche (Navigation) */}
        <div className="w-[300px] hidden xl:block relative">
          <LeftSidebar />
        </div>

        {/* Colonne Centrale (Feed) */}
        <main className="flex-1 max-w-[700px] p-4 min-h-screen">
          <div className="mx-auto max-w-[590px]">
            
             {/* Zone d'affichage selon l'onglet actif */}
            {activeTab === 'home' && (
              <>
                {/* contenu par défaut / fil d'actualité */}
                <div><Homee /></div>
              </>
            )}

            {activeTab === 'users' && (
              <>
                <div>Liste dutilisateurs / communauté</div>
              </>
            )}

            {activeTab === 'videos' && (
              <>
                <div>Section vidéos</div>
              </>
            )}
            {activeTab === 'store' && (
              <>
                <div>Section boutique</div>
              </>
            )}

            {activeTab === 'friend' && (
              <>
                {/* Composant fourni par un collègue, intégré au projet */}
                
              </>
            )}
          </div>

        </main>

        {/* Colonne Droite (Contacts) */}
        <div className="w-[300px] hidden xl:block relative">
          <RightSidebar />
        </div>
        
      </div>
    </div>
  );
}

/* Petits composants helpers pour la Navbar uniquement */
/* onClick est typé pour accepter directement setActiveTab (Dispatch) */
const NavItem = ({
  id,
  icon: Icon,
  active,
  onClick
}: {
  id: TabId;
  icon: IconComponent;
  active?: boolean;
  onClick: React.Dispatch<React.SetStateAction<TabId>>; // typage strict, pas d'any
}) => (
  <button
    onClick={() => onClick(id)}
    className={`px-8 md:px-10 flex items-center border-b-4 cursor-pointer hover:bg-gray-100 transition ${active ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
    aria-pressed={active}
  >
    <Icon className="w-7 h-7" />
  </button>
);

const ActionIcon = ({ icon: Icon }: { icon: IconComponent }) => (
  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
    <Icon size={20} className="text-black" />
  </div>
);