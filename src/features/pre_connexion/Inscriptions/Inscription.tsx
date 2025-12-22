'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulation d'inscription
    setTimeout(() => {
      setIsLoading(false);
      console.log("Compte créé !");
    }, 2000);
  }

  return (
    <div className="flex min-h-screen w-full font-sans bg-gray-50">
      
      {/* COTE GAUCHE : Branding (Identique mais texte adapté) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-violet-900 overflow-hidden flex-col items-center justify-center text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-800 to-indigo-950 opacity-90" />
        
        {/* Décoration de fond */}
        <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20" />
        </div>
        
        <div className="relative z-10 px-12 text-center">
          <h1 className="mb-4 font-bold text-5xl tracking-tight">Threadly.</h1>
          <p className="text-violet-200 text-lg font-light leading-relaxed max-w-md mx-auto">
            Rejoignez la communauté. Tissez des liens dès aujourdhui.
          </p>
        </div>
      </div>

      {/* COTE DROIT : Formulaire d'inscription */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900">Créer un compte</h2>
            <p className="mt-2 text-sm text-gray-500">C est gratuit et ça prend moins dune minute.</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            
            {/* Champ Nom Complet (Nouveau) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="name"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                  placeholder="Antoine ESSOMBA"
                />
              </div>
            </div>

            {/* Champ Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                  placeholder="nom@exemple.com"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                  placeholder="Au moins 8 caractères"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Doit contenir au moins 8 caractères et un chiffre.
              </p>
            </div>

            {/* Bouton d'action */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all mt-6"
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                <span className="flex items-center">
                  Sinscrire <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </button>
          </form>

          {/* Lien retour vers Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Déjà membre ?{' '}
              <Link href="/" className="font-medium text-violet-600 hover:text-violet-500">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}