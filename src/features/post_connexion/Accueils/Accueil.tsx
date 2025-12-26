'use client';

import { useState } from 'react';
import React from "react";
import Link from "next/link"; 
import { Search, Home, Users, Store, MonitorPlay, Bell } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { LeftSidebar, RightSidebar } from "@/features/navigation";
import Homee from '@/features/post_connexion/Accueils/components/Homee';
import Ami from '../Amis/Ami';
import Service from '../Services/Service';

// 1. IMPORT DE L'ANIMATION
import { motion } from "framer-motion";

// --- TYPES ---
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number }>;
type TabId = 'home' | 'friends' | 'services' ;

// Configuration des onglets de navigation
const NAV_TABS = [
  { id: 'home', icon: Home },
  { id: 'friends', icon: Users },
  { id: 'services', icon: Store },
] as const;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  // --- LOGIQUE DYNAMIQUE ---
  const isServiceTab = activeTab === 'services';

  // Largeur du conteneur principal (main)
  const mainContainerClass = isServiceTab 
    ? 'max-w-5xl' 
    : 'max-w-[700px]';
    
  // Largeur du conteneur interne
  const innerContainerClass = isServiceTab 
    ? 'w-full' 
    : 'max-w-[590px]';
  // -------------------------

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-900 font-sans">
      
      {/* HEADER FIXE */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white shadow-sm flex items-center justify-between px-4 z-50">
        
        {/* LOGO + RECHERCHE */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            Th
          </div>
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2">
            <Search className="text-gray-500 w-5 h-5" />
            <input type="text" placeholder="Rechercher sur Threadly" className="bg-transparent border-none outline-none ml-2 text-sm w-48" />
          </div>
        </div>

        {/* NAVIGATION CENTRALE (ANIMÉE) */}
        <nav className="hidden md:flex h-full">
          {NAV_TABS.map((tab) => (
             <NavItem 
                key={tab.id}
                id={tab.id}
                icon={tab.icon}
                active={activeTab === tab.id}
                onClick={setActiveTab}
             />
          ))}
        </nav>

        {/* ACTIONS DROITE */}
        <div className="flex items-center gap-2">
            <Link href="/post_connexion/Amis">
              <div className="hidden lg:flex items-center gap-2 bg-purple-50 text-purple-600 font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-purple-100 transition-colors">
                <span className="text-sm">Trouver vos ami(e)s</span>
              </div>
            </Link>
            <ActionIcon icon={Bell} />
            <Avatar size="sm" alt="Me" />
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <div className="pt-14 flex justify-center">
        
        {/* SIDEBAR GAUCHE */}
        <div className="w-[300px] hidden xl:block relative">
          <LeftSidebar />
        </div>

        {/* FEED / CONTENU CENTRAL */}
        <main className={`flex-1 ${mainContainerClass} p-4 min-h-screen transition-all duration-300 ease-in-out`}>
          <div className={`mx-auto ${innerContainerClass} transition-all duration-300`}>
            
            {activeTab === 'home' && (
              <div><Homee /></div>
            )}

            {activeTab === 'friends' && (
              <div><Ami /></div>
            )}

            {activeTab === 'services' && (
              <div><Service /></div>
            )}
            
          </div>
        </main>
        
      </div>
    </div>
  );
}

/* --- COMPOSANT NAVITEM ANIMÉ --- */
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
    className={`px-8 md:px-12 h-full flex items-center justify-center relative cursor-pointer outline-none transition-colors
      ${active ? 'text-purple-600' : 'text-gray-500 hover:bg-gray-100'}
    `}
    aria-pressed={active}
  >
    {/* L'icône */}
    <Icon className="w-7 h-7 relative z-10" />

    {/* La barre de soulignement animée */}
    {active && (
      <motion.div
        layoutId="header-nav-underline" // L'ID magique qui lie les éléments entre eux
        className="absolute bottom-0 left-0 right-0 h-[4px] bg-purple-600 rounded-t-sm"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </button>
);

const ActionIcon = ({ icon: Icon }: { icon: IconComponent }) => (
  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
    <Icon size={20} className="text-black" />
  </div>
);