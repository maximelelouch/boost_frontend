'use client';
import { useState } from 'react';
import React from "react";
import { Search, Home, Users, Store, MonitorPlay, Bell } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { LeftSidebar, RightSidebar } from "@/features/navigation";
import Homee from '@/features/post_connexion/Accueils/components/Homee';
import Ami from '../Amis/Ami';
import Service from '../Services/Service';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number }>;

type TabId = 'home' | 'friends' | 'services' ;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  // --- LOGIQUE DYNAMIQUE ---
  // Si on est sur 'services', on élargit le conteneur principal.
  // Sinon (home/friends), on garde la largeur "feed" classique.
  const isServiceTab = activeTab === 'services';

  // Largeur du conteneur principal (main)
  const mainContainerClass = isServiceTab 
    ? 'max-w-5xl' // Largeur grand écran pour les services (~1024px)
    : 'max-w-[700px]'; // Largeur standard pour le fil d'actu
    
  // Largeur du conteneur interne
  const innerContainerClass = isServiceTab 
    ? 'w-full' // Utilise tout l'espace disponible dans le main
    : 'max-w-[590px]'; // Reste centré et étroit pour le feed
  // -------------------------

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-900 font-sans">
      
      <header className="fixed top-0 left-0 right-0 h-14 bg-white shadow-sm flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            Th
          </div>
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2">
            <Search className="text-gray-500 w-5 h-5" />
            <input type="text" placeholder="Rechercher sur Threadly" className="bg-transparent border-none outline-none ml-2 text-sm w-48" />
          </div>
        </div>

        <nav className="hidden md:flex gap-1 h-full">
          <NavItem id="home" icon={Home} active={activeTab === 'home'} onClick={setActiveTab} />
          <NavItem id="friends" icon={Users} active={activeTab === 'friends'} onClick={setActiveTab} />
          <NavItem id="services" icon={Store} active={activeTab === 'services'} onClick={setActiveTab} />
        </nav>

        <div className="flex items-center gap-2">
           <div className="hidden lg:flex items-center gap-2 bg-purple-50 text-purple-600 font-medium px-3 py-1 rounded-full cursor-pointer">
             <span className="text-sm">Trouver vos ami(e)s</span>
           </div>
           
           <ActionIcon icon={Bell} />
           <Avatar size="sm" alt="Me" />
        </div>
      </header>

      <div className="pt-14 flex justify-center">
        
        <div className="w-[300px] hidden xl:block relative">
          <LeftSidebar />
        </div>

        {/* APPLICATION DES CLASSES DYNAMIQUES ICI */}
        <main className={`flex-1 ${mainContainerClass} p-4 min-h-screen transition-all duration-300 ease-in-out`}>
          <div className={`mx-auto ${innerContainerClass} transition-all duration-300`}>
            
            {activeTab === 'home' && (
              <>
                <div><Homee /></div>
              </>
            )}

            {activeTab === 'friends' && (
              <>
                <div><Ami /></div>
              </>
            )}

            {activeTab === 'services' && (
              <>
                <div><Service /></div>
              </>
            )}
            
          </div>
        </main>
        
      </div>
    </div>
  );
}

/* Petits composants helpers pour la Navbar uniquement */
const NavItem = ({
  id,
  icon: Icon,
  active,
  onClick
}: {
  id: TabId;
  icon: IconComponent;
  active?: boolean;
  onClick: React.Dispatch<React.SetStateAction<TabId>>;
}) => (
  <button
    onClick={() => onClick(id)}
    className={`px-8 md:px-10 flex items-center border-b-4 cursor-pointer hover:bg-gray-100 transition ${active ? 'border-purple-500 text-purple-500' : 'border-transparent text-gray-500'}`}
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