"use client";

import React, { useState, useRef } from "react";
import { 
  Camera, MapPin, Briefcase, Calendar, Edit3, 
  Flag, Plus, Settings, BarChart3, ExternalLink, 
  Check, Image as ImageIcon 
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import CreatePage from "@/features/post_connexion/Accueils/components/CreatePage"; 

// --- 1. IMPORT DE FRAMER MOTION ---
import { motion } from "framer-motion";

// --- TYPES ---
type TabType = "posts" | "about" | "pages" | "photos";

// Données simulées
const MY_PAGES = [
  {
    id: 1,
    name: "Threadly Cuisine",
    category: "Cuisine & Art de vivre",
    role: "Admin",
    followers: "12.5k",
    notifications: 3,
    coverColor: "bg-orange-100",
  },
  {
    id: 2,
    name: "Antoine Tech",
    category: "Créateur digital",
    role: "Éditeur",
    followers: "2.1k",
    notifications: 0,
    coverColor: "bg-blue-100",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("posts");
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [isEditingIntro, setIsEditingIntro] = useState(false);
  
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null); 
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  // Configuration des Onglets pour la boucle d'affichage
  const TABS = [
    { id: "posts", label: "Publications" },
    { id: "about", label: "À propos" },
    { id: "pages", label: "Mes Pages", count: MY_PAGES.length },
    { id: "photos", label: "Photos" },
  ];

  // --- HANDLERS ---
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'profile') => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      if (type === 'cover') setCoverImage(url);
      if (type === 'profile') setProfileImage(url);
      showToast(`Photo de ${type === 'cover' ? 'couverture' : 'profil'} mise à jour ! 📸`);
    }
  };

  const handleEditIntro = () => {
    if (isEditingIntro) {
      showToast("Modifications enregistrées ! ✅");
    }
    setIsEditingIntro(!isEditingIntro);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] pb-10 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-center gap-2">
            <Check size={16} className="text-green-400" />
            <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* --- EN-TÊTE --- */}
      <div className="bg-white shadow-sm mb-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Couverture */}
          <div className="h-48 md:h-80 bg-gray-200 rounded-b-2xl relative group overflow-hidden">
            {coverImage ? (
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-gradient-to-r from-purple-400 to-indigo-500"></div>
            )}
            <button 
                onClick={() => coverInputRef.current?.click()}
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-3 py-2 rounded-lg text-sm font-semibold shadow-md flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
            >
              <Camera size={18} /> Changer la couverture
            </button>
            <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover')} />
          </div>

          {/* Info Profil */}
          <div className="px-4 md:px-8 pb-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end -mt-12 relative mb-4">
              
              {/* Photo de Profil */}
              <div className="relative group">
                <div 
                  className="w-40 h-40 rounded-full border-[4px] border-white bg-white overflow-hidden shadow-md cursor-pointer flex items-center justify-center bg-gray-50" 
                  onClick={() => profileInputRef.current?.click()}
                >
                   {profileImage ? (
                       <img src={profileImage} alt="Profile" className="w-full h-full object-cover group-hover:opacity-90 transition" />
                   ) : (
                       <div className="w-full h-full flex items-center justify-center">
                          <Avatar alt="Antoine" />
                       </div>
                   )}
                </div>
                <button 
                    onClick={() => profileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-full border border-white shadow-sm text-gray-700 cursor-pointer"
                >
                  <Camera size={20} />
                </button>
                <input type="file" ref={profileInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')} />
              </div>

              {/* Nom & Actions */}
              <div className="flex-1 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Antoine Emmanuel</h1>
                <p className="text-gray-500 font-medium">1.2k amis • Développeur Fullstack</p>
                <div className="flex -space-x-2 mt-2 cursor-pointer hover:opacity-80 transition" onClick={() => showToast("Liste d'amis (Bientôt disponible)")}>
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"></div>
                  ))}
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-3 mt-4 md:mt-0">
                <button 
                    onClick={() => showToast("Redirection vers l'édition du profil...")}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition"
                >
                  <Edit3 size={18} /> Modifier le profil
                </button>
                <button 
                    onClick={() => setIsPageModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-md shadow-purple-200 transition transform active:scale-95"
                >
                  <Plus size={18} /> Créer une Page
                </button>
              </div>
            </div>

            {/* --- 2. BARRE DE NAVIGATION ANIMÉE --- */}
            <div className="border-t border-gray-200 mt-6 pt-1 flex gap-1 overflow-x-auto scrollbar-hide relative">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`px-6 py-4 font-semibold text-[15px] relative transition-colors whitespace-nowrap flex items-center gap-2 select-none outline-none
                      ${isActive ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50 rounded-lg'}
                    `}
                  >
                    {/* Label */}
                    <span className="relative z-10">{tab.label}</span>
                    
                    {/* Badge compteur (pour Mes Pages) */}
                    {tab.count !== undefined && (
                        <span className={`relative z-10 text-xs px-1.5 py-0.5 rounded-full transition-colors ${isActive ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-600'}`}>
                            {tab.count}
                        </span>
                    )}

                    {/* L'ANIMATION MAGIQUE : layoutId permet à cet élément de glisser d'un bouton à l'autre */}
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-purple-600 rounded-t-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENU --- */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        
        {/* Colonne Gauche */}
        {(activeTab === 'posts' || activeTab === 'about') && (
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <Card className="p-4 bg-white shadow-sm rounded-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Intro</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-3">
                  <Briefcase className="text-gray-400 flex-shrink-0" size={20} />
                  {isEditingIntro ? <input type="text" defaultValue="Threadly Inc." className="border-b border-purple-300 outline-none w-full text-sm py-1" /> : <span>Travaille chez <strong className="text-gray-900">Threadly Inc.</strong></span>}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="text-gray-400 flex-shrink-0" size={20} />
                  {isEditingIntro ? <input type="text" defaultValue="Paris, France" className="border-b border-purple-300 outline-none w-full text-sm py-1" /> : <span>Habite à <strong className="text-gray-900">Paris, France</strong></span>}
                </li>
                <li className="flex items-center gap-3">
                  <Calendar className="text-gray-400 flex-shrink-0" size={20} />
                  <span>A rejoint en Septembre 2023</span>
                </li>
              </ul>
              <button 
                onClick={handleEditIntro}
                className={`w-full mt-6 font-semibold py-2 rounded-lg transition ${isEditingIntro ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                {isEditingIntro ? "Enregistrer" : "Modifier les infos"}
              </button>
            </Card>
            
            <Card className="p-4 bg-white shadow-sm rounded-xl">
               <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-bold text-gray-800">Photos</h2>
                 <span onClick={() => setActiveTab('photos')} className="text-purple-600 text-sm cursor-pointer hover:underline">Tout voir</span>
               </div>
               <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
                  {[1,2,3,4,5,6].map(i => (
                     <div key={i} onClick={() => showToast("Aperçu...")} className="aspect-square bg-gray-100 hover:opacity-90 cursor-pointer flex items-center justify-center group">
                        <ImageIcon className="text-gray-300 group-hover:text-gray-400" />
                     </div>
                  ))}
               </div>
            </Card>
          </div>
        )}

        {/* Colonne Droite */}
        <div className={`flex-1 ${activeTab === 'pages' ? 'w-full' : ''}`}>
          
          {activeTab === 'pages' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-gray-800">Vos Pages gérées</h2>
                 <button onClick={() => setIsPageModalOpen(true)} className="text-purple-600 font-semibold text-sm hover:bg-purple-50 px-3 py-1 rounded-lg transition">
                    + Créer une nouvelle Page
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MY_PAGES.map((page) => (
                  <div key={page.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                    <div className={`h-24 ${page.coverColor} relative cursor-pointer`} onClick={() => showToast(`Vers ${page.name}`)}>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="bg-white/50 hover:bg-white p-1.5 rounded-full text-gray-600"><Settings size={16}/></button>
                        </div>
                    </div>
                    <div className="px-5 pb-5 relative">
                        <div className="-mt-10 mb-3 flex justify-between items-end">
                            <div className="w-20 h-20 rounded-xl border-4 border-white bg-white shadow-sm flex items-center justify-center text-gray-400 bg-gray-50">
                                <Flag size={32} />
                            </div>
                            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide mb-1">{page.role}</span>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">{page.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{page.category}</p>
                        </div>
                        <div className="flex items-center gap-4 py-3 border-t border-gray-50">
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                <BarChart3 size={16} className="text-purple-500" />
                                <span className="font-semibold text-gray-900">{page.followers}</span> abonnés
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => showToast("Dashboard...")} className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-2 rounded-lg text-sm transition border border-purple-200">Tableau de bord</button>
                            <button className="px-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition"><ExternalLink size={18} /></button>
                        </div>
                    </div>
                  </div>
                ))}

                <div onClick={() => setIsPageModalOpen(true)} className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center min-h-[280px] hover:border-purple-300 hover:bg-purple-50/30 transition cursor-pointer group">
                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus size={32} className="text-gray-400 group-hover:text-purple-600" />
                    </div>
                    <span className="font-semibold text-gray-600 group-hover:text-purple-700">Créer une nouvelle Page</span>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'posts' || activeTab === 'photos') && (
             <div className="space-y-4">
                <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                         {activeTab === 'posts' ? <Edit3 className="text-gray-400" /> : <ImageIcon className="text-gray-400" />}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{activeTab === 'posts' ? "Aucune publication" : "Aucune photo"}</h3>
                </div>
             </div>
          )}
        </div>
      </div>

      <CreatePage 
         isOpen={isPageModalOpen} 
         onClose={() => setIsPageModalOpen(false)} 
      />

    </div>
  );
}