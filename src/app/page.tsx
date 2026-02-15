'use client';

import React, { useState } from 'react';
import { useAuth } from '@lib/hooks/useAPI';
import Link from 'next/link';
import { Mail, Lock, Loader2, ArrowRight, Heart, MessageCircle, Share2, MoreHorizontal, ThumbsUp } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login({ 
        username: email,  
        password 
      });
      // La redirection est gérée dans le hook
    } catch (err) {
      // L'erreur est gérée et affichée par le hook
    }
  }

  return (
    <div className="flex min-h-screen w-full font-sans bg-[#0A0A0B] text-white selection:bg-violet-500/30">
      
      {/* =================================================================
          PARTIE GAUCHE : VISUEL "FEED SOCIAL" (Facebook Style)
         ================================================================= */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-12">
        
        {/* Fond et Aurores (Inchangés) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/40 rounded-full blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/30 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />

        {/* CONTENU : Carte "Social Post" */}
        <div className="relative z-10 w-full max-w-md">
            
            {/* Le Post en Verre */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 shadow-2xl ring-1 ring-white/5 transform transition-all hover:scale-[1.01] duration-500">
                
                {/* 1. Header du Post (Utilisateur) */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black border-2 border-transparent flex items-center justify-center overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full" />
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white">Alexandre Dumas</div>
                            <div className="text-[10px] text-gray-400 flex items-center gap-1">
                                il y a 2h • <span className="bg-white/20 w-3 h-3 rounded-full flex items-center justify-center">🌍</span>
                            </div>
                        </div>
                    </div>
                    <MoreHorizontal className="text-gray-500 w-5 h-5" />
                </div>

                {/* 2. Contenu du Post */}
                <div className="mb-4 space-y-3">
                    <p className="text-sm text-gray-200 leading-relaxed">
                        Quel plaisir de retrouver la communauté Threadly ! L interface est incroyable. 🚀 <span className="text-violet-400">#NewDesign #Community</span>
                    </p>
                    
                   {/* Placeholder Média (Méthode Infaillible) */}
                    {/* J'ai ajouté 'h-48' et 'min-h-[200px]' pour forcer la hauteur si aspect-video ne marche pas */}
                    <div className="w-full aspect-video h-56 min-h-[220px] rounded-xl border border-white/5 relative overflow-hidden group cursor-pointer shadow-lg shadow-black/30">
                        
                        {/* IMAGE EN BACKGROUND (Force l'affichage) */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ 
                                backgroundImage: `url('https://images.unsplash.com/photo-1518182170546-0766aaef06a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')`,
                                opacity: 0.9 
                            }}
                        />
                        
                        {/* Dégradé pour la lisibilité */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                        {/* Tag Localisation */}
                        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white border border-white/10 flex items-center gap-2 shadow-sm z-10">
                             <span>📍</span> Kribi, Cameroun
                        </div>
                    </div>
                </div>

                {/* 3. Footer du Post (Actions) */}
                <div className="border-t border-white/10 pt-3 flex items-center justify-between text-gray-400">
                    <button className="flex items-center gap-2 hover:text-red-400 transition-colors group">
                        <Heart className="w-5 h-5 group-hover:fill-red-400 transition-all" />
                        <span className="text-xs">42 J aime</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-violet-400 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-xs">Commenter</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-xs">Partager</span>
                    </button>
                </div>
            </div>

            {/* Carte Flottante : Suggestion d'ami (Typique Facebook) */}
            <div className="absolute -right-12 bottom-20 bg-[#18181B] border border-white/10 p-3 rounded-xl shadow-2xl flex items-center gap-3 animate-float max-w-[200px]">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Friend" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-violet-600 rounded-full p-0.5 border-2 border-[#18181B]">
                        <ThumbsUp className="w-3 h-3 text-white" />
                    </div>
                </div>
                <div>
                    <div className="text-xs font-bold text-white">Sarah M.</div>
                    <div className="text-[10px] text-gray-400">2 amis en commun</div>
                </div>
                <button className="bg-violet-600/20 text-violet-400 p-1.5 rounded-lg hover:bg-violet-600 hover:text-white transition-colors">
                    <span className="text-xs font-bold">+</span>
                </button>
            </div>
        </div>
        
        <div className="absolute bottom-10 text-center z-10">
             <p className="text-white/40 text-sm font-light tracking-wide">Connectez-vous à ce qui compte.</p>
        </div>
      </div>

      {/* =================================================================
          PARTIE DROITE : FORMULAIRE LOGIN (Inchangé, juste le rappel du layout)
         ================================================================= */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 bg-black lg:bg-[#0A0A0B]">
        {/* ... (Copier le même formulaire que la version précédente ici) ... */}
        {/* Pour gagner de la place, je ne remets pas tout le code du formulaire de droite s'il n'a pas changé,
            mais si tu veux je peux le remettre. Utilise le formulaire "Continuer avec Google" centré. */}
         <div className="w-full max-w-[400px]">
          
          <div className="lg:hidden flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center font-bold">Th</div>
            <span className="font-bold text-xl">threadly.</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Bon retour.</h1>
            <p className="text-gray-400">Heureux de vous revoir sur Threadly.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1 uppercase tracking-wider">Email</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
                    </div>
                    <input type="email" name="email" required className="block w-full pl-11 pr-4 py-3.5 bg-[#18181B] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all shadow-sm" placeholder="nom@exemple.com" />
                </div>
            </div>
            <div className="group">
                <div className="flex items-center justify-between mb-1.5 ml-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Mot de passe</label>
                    <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Oublié ?</a>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
                    </div>
                    <input type="password" name="password" required className="block w-full pl-11 pr-4 py-3.5 bg-[#18181B] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all shadow-sm" placeholder="••••••••" />
                </div>
            </div>
            <button type="submit" disabled={isLoading} className="relative w-full py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] mt-2">
                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                   <><span>Se connecter</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />
            </button>
          </form>

                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0A0A0B] px-2 text-gray-500">Ou continuer avec</span></div>
          </div>

          <div>
            <button type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm text-gray-300 group">
                <svg className="h-4 w-4 text-gray-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                <span>Continuer avec Google</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Pas encore de compte ? <Link href="/pre_connexion/Inscriptions" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">Rejoindre Threadly</Link></p>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}