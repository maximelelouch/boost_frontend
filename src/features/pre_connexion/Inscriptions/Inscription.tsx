'use client';

import React, { useState } from 'react';
import { useAuth } from '@lib/hooks/useAPI';
import Link from 'next/link';
import { User, Mail, Lock, Loader2, ArrowRight, Heart, Users, Calendar } from 'lucide-react';

export default function SignupPage() {
  const { register, isLoading, error } = useAuth();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const fullName = (username || '').trim();
    const nameParts = fullName.split(/\s+/).filter(Boolean);
    const first_name = nameParts[0] || fullName;
    const last_name = nameParts.length > 1 ? nameParts.slice(1).join(' ') : fullName;

    const emailNormalized = email.trim().toLowerCase();
    const emailPrefix = emailNormalized.split('@')[0] || '';
    const usernameForBackend = (fullName || emailPrefix)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_\.\-]/g, '')
      .slice(0, 150);

    try {
      // Envoyer les données au format attendu par le backend
      await register({ 
        username: usernameForBackend,
        email: emailNormalized,
        password: password,
        // Djoser exige souvent first_name/last_name + re_password selon config
        first_name,
        last_name,
        re_password: password,
      });
      // La redirection est gérée par le hook useAuth
    } catch (err) {
      // L'erreur est déjà gérée par le hook useAuth
      console.error('Échec de l\'inscription :', err);
    }
  }

  return (
    <div className="flex min-h-screen w-full font-sans bg-[#0A0A0B] text-white selection:bg-violet-500/30">
      
      {/* PARTIE GAUCHE : VISUEL "COMMUNAUTÉ" */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-12">
        
        {/* Fond et Aurores */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-600/40 rounded-full blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-fuchsia-600/30 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />

        <div className="relative z-10 w-full max-w-md">
            
            {/* Le Post "Événement / Groupe" */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 shadow-2xl ring-1 ring-white/5 transform transition-all hover:scale-[1.01] duration-500">
                
                {/* Header (Groupe) */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-fuchsia-500 to-purple-600 flex items-center justify-center">
                        <Users className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white">Startup Douala Tech</div>
                        <div className="text-[10px] text-gray-400">Groupe Public • 12k membres</div>
                    </div>
                </div>

                {/* Contenu */}
                <div className="mb-4">
                    <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-tr from-gray-800 to-gray-900 border border-white/5 relative overflow-hidden mb-3">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-70"></div>
                        <div className="absolute top-2 right-2 bg-violet-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                            ÉVÉNEMENT
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                             <div className="text-white font-bold text-lg leading-tight">Meetup Créateurs 2025</div>
                             <div className="text-gray-300 text-xs mt-1 flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> Demain à 18h00
                             </div>
                        </div>
                    </div>
                </div>

                {/* Footer (Intéressés) */}
                <div className="flex items-center justify-between">
                    <div className="flex -space-x-2 overflow-hidden">
                        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0A0A0B]" src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt=""/>
                        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0A0A0B]" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" alt=""/>
                        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0A0A0B]" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" alt=""/>
                    </div>
                    <div className="text-xs text-gray-400">+148 participants</div>
                    <button className="bg-white text-black px-3 py-1.5 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors">
                        Je participe
                    </button>
                </div>
            </div>

            {/* Carte Flottante : Invitation */}
            <div className="absolute -left-8 top-10 bg-[#18181B] border border-white/10 p-3 rounded-xl shadow-2xl flex items-center gap-3 animate-float animation-delay-2000 max-w-[220px]">
                <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                    <Users className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-xs font-medium text-white">Nouveau Groupe</div>
                    <div className="text-[10px] text-gray-500">Vous avez été invité(e)</div>
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-10 text-center z-10">
             <p className="text-white/40 text-sm font-light tracking-wide">Rejoignez des communautés vibrantes.</p>
        </div>
      </div>

      {/* PARTIE DROITE : FORMULAIRE INSCRIPTION (Inchangé dans la logique) */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 bg-black lg:bg-[#0A0A0B]">
        <div className="w-full max-w-[400px]">
          
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center font-bold">Th</div>
            <span className="font-bold text-xl">threadly.</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Créer un compte</h1>
            <p className="text-gray-400">Commencez votre expérience Threadly gratuitement.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1 uppercase tracking-wider">Nom complet</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
                    </div>
                    <input type="text" name="username" required className="block w-full pl-11 pr-4 py-3.5 bg-[#18181B] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all shadow-sm" placeholder="Jean Dupont" />
                </div>
            </div>
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
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1 uppercase tracking-wider">Mot de passe</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
                    </div>
                    <input type="password" name="password" required className="block w-full pl-11 pr-4 py-3.5 bg-[#18181B] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all shadow-sm" placeholder="Au moins 8 caractères" />
                </div>
            </div>
            <button type="submit" disabled={isLoading} className="relative w-full py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] mt-4">
                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                   <><span>Commencer l aventure</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />
            </button>
          </form>

                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0A0A0B] px-2 text-gray-500">Ou s inscrire avec</span></div>
          </div>

          <div>
            <button type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm text-gray-300 group">
                <svg className="h-4 w-4 text-gray-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                <span>S inscrire avec Google</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Déjà un compte ? <Link href="/" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">Se connecter</Link></p>
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