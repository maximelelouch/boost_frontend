// src/features/post_connexion/Publicite/Publicite.tsx
'use client';

import React, { useState } from 'react';
import { 
  Megaphone, 
  ThumbsUp, 
  CreditCard, 
  MapPin, 
  Target, 
  CheckCircle2,
  MessageCircle,
  LayoutGrid
} from 'lucide-react';
import Link from 'next/link';

import { BoostType } from './types';
import { MY_PAGE, MY_POSTS } from './data';
import PagePromoPreview from './components/PagePromoPreview';
import PostBoostPreview from './components/PostBoostPreview';

export default function Publicite() {
  // --- STATES ---
  const [boostType, setBoostType] = useState<BoostType>('PAGE_GROWTH'); 
  const [selectedPostId, setSelectedPostId] = useState<string>(MY_POSTS[0].id);
  
  // Paramètres de campagne
  const [budget, setBudget] = useState<number>(10); // $
  const [duration, setDuration] = useState<number>(5); // Jours
  const [location, setLocation] = useState<string>('Douala (+40km)');
  const [ageRange, setAgeRange] = useState<string>('18 - 45');

  // Calculs dynamiques
  const dailyBudget = (budget / duration).toFixed(2);
  const estimatedReachMin = Math.floor(budget * 80);
  const estimatedReachMax = Math.floor(budget * 250);

  const selectedPost = MY_POSTS.find(p => p.id === selectedPostId) || MY_POSTS[0];

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Megaphone className="text-blue-600" /> Centre de Publicité
            </h1>
            <p className="text-gray-500 mt-1">Créez une nouvelle promotion ou analysez vos performances.</p>
          </div>
          <Link href="/dashboard" className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-sm text-gray-800 hover:bg-gray-50 transition-colors">
            <LayoutGrid size={16} />
            Gérer mes campagnes
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLONNE GAUCHE : CONFIGURATION (8 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* 1. Choix de l'objectif */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Quel est votre objectif ?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                        onClick={() => setBoostType('PAGE_GROWTH')}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${boostType === 'PAGE_GROWTH' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${boostType === 'PAGE_GROWTH' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                <ThumbsUp size={20} />
                            </div>
                            <span className="font-bold text-gray-900">Promouvoir la Page</span>
                        </div>
                        <p className="text-sm text-gray-500">Obtenez plus de mentions "J'aime" et d'abonnés pour construire votre crédibilité.</p>
                    </button>

                    <button 
                        onClick={() => setBoostType('POST_ENGAGEMENT')}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${boostType === 'POST_ENGAGEMENT' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${boostType === 'POST_ENGAGEMENT' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                <MessageCircle size={20} />
                            </div>
                            <span className="font-bold text-gray-900">Booster un Post</span>
                        </div>
                        <p className="text-sm text-gray-500">Obtenez plus de vues, de likes et de commentaires sur une publication précise.</p>
                    </button>
                </div>

                {/* Sélecteur de Post (Affiché seulement si POST_ENGAGEMENT) */}
                {boostType === 'POST_ENGAGEMENT' && (
                    <div className="mt-6 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
                        <h3 className="text-sm font-bold text-gray-700 mb-3">Sélectionnez la publication à booster</h3>
                        <div className="space-y-3">
                            {MY_POSTS.map(post => (
                                <div 
                                    key={post.id}
                                    onClick={() => setSelectedPostId(post.id)}
                                    className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-colors ${selectedPostId === post.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                        {post.image ? <img src={post.image} alt="" className="w-full h-full object-cover"/> : <div className="flex items-center justify-center h-full text-xs text-gray-400">Txt</div>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-800 truncate">{post.content}</p>
                                        <p className="text-xs text-gray-400">{post.date}</p>
                                    </div>
                                    {selectedPostId === post.id && <CheckCircle2 className="text-blue-600" size={20} />}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 2. Ciblage (Audience) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Target size={20} className="text-gray-500"/> Audience
                </h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                        <div className="flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                            <MapPin size={18} className="text-gray-400 mr-2" />
                            <select 
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="bg-transparent flex-1 outline-none text-gray-800"
                            >
                                <option>Douala (+40km)</option>
                                <option>Yaoundé (+40km)</option>
                                <option>Tout le Cameroun</option>
                            </select>
                        </div>
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Âge & Genre</label>
                         <div className="grid grid-cols-2 gap-4">
                            <select 
                                value={ageRange}
                                onChange={(e) => setAgeRange(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
                            >
                                <option>18 - 65+</option>
                                <option>18 - 35</option>
                                <option>25 - 45</option>
                            </select>
                            <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white">
                                <option>Tous</option>
                                <option>Hommes</option>
                                <option>Femmes</option>
                            </select>
                         </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Centres d'intérêt</label>
                        <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg bg-white min-h-[60px]">
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">Technologie <span className="cursor-pointer font-bold">×</span></span>
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">Startup <span className="cursor-pointer font-bold">×</span></span>
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">Business <span className="cursor-pointer font-bold">×</span></span>
                            <input type="text" placeholder="Ajouter un intérêt..." className="text-sm outline-none flex-1 min-w-[100px]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Budget & Durée */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CreditCard size={20} className="text-gray-500"/> Budget et calendrier
                </h2>

                <div className="space-y-6">
                    {/* Slider Durée */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">Durée</label>
                            <span className="font-bold text-gray-900">{duration} jours</span>
                        </div>
                        <input 
                            type="range" min="1" max="30" value={duration} 
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>1 jour</span>
                            <span>30 jours</span>
                        </div>
                    </div>

                    {/* Slider Budget */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">Budget Total</label>
                            <span className="font-bold text-gray-900">{budget}$ USD</span>
                        </div>
                        <input 
                            type="range" min="5" max="500" step="5" value={budget} 
                            onChange={(e) => setBudget(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <p className="text-xs text-gray-500 mt-2 text-right">Soit {dailyBudget}$ par jour</p>
                    </div>
                </div>
            </div>

          </div>

          {/* COLONNE DROITE : PREVIEW & RECAP (4 cols) - Sticky */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Zone de Prévisualisation */}
            <div className="sticky top-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Aperçu de la publicité</h3>
                
                {/* Rendu conditionnel selon le type de boost */}
                <div className="mb-6">
                    {boostType === 'PAGE_GROWTH' 
                        ? <PagePromoPreview page={MY_PAGE} />
                        : <PostBoostPreview page={MY_PAGE} post={selectedPost} />
                    }
                </div>

                {/* 2. Récapitulatif et Paiement */}
                <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Récapitulatif de paiement</h3>
                    
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Audience estimée</span>
                            <span className="font-medium text-gray-900">{estimatedReachMin.toLocaleString()} - {estimatedReachMax.toLocaleString()} personnes</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Durée</span>
                            <span className="font-medium text-gray-900">{duration} jours</span>
                        </div>
                        <div className="h-px bg-gray-100 my-2"></div>
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-700">Montant total</span>
                            <span className="text-2xl font-bold text-blue-600">{budget}$</span>
                        </div>
                    </div>

                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-95">
                        Booster maintenant
                    </button>
                    
                    <p className="text-xs text-center text-gray-400 mt-3">
                        En cliquant, vous acceptez les conditions générales de vente publicitaire.
                    </p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}