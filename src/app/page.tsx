'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';


export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // Simulation d'un appel API (à remplacer par votre vraie logique)
    setTimeout(() => {
      setIsLoading(false);
      console.log("Connexion en cours...");
    }, 2000);
  }

  return (
    <div className="flex min-h-screen w-full font-sans bg-gray-50">
      
      {/* ---------------------------------------------------------
          PARTIE GAUCHE : Branding (Visible sur grand écran uniquement)
         --------------------------------------------------------- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-violet-900 overflow-hidden flex-col items-center justify-center text-white">
        
        {/* Fond avec dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-800 to-indigo-950 opacity-90" />
        
        {/* Formes décoratives en arrière-plan */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-fuchsia-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20" />
        </div>
        
        {/* Contenu Branding */}
        <div className="relative z-10 px-12 text-center">
          <h1 className="mb-4 font-bold text-5xl tracking-tight">Threadly.</h1>
          <p className="text-violet-200 text-lg font-light leading-relaxed max-w-md mx-auto">
            Centralisez vos conversations. Simplifiez vos échanges.
          </p>
        </div>

        {/* Copyright bas de page gauche */}
        <div className="absolute bottom-8 text-violet-300 text-xs z-10">
            &copy; {new Date().getFullYear()} Threadly Inc.
        </div>
      </div>

      {/* ---------------------------------------------------------
          PARTIE DROITE : Formulaire de Connexion
         --------------------------------------------------------- */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Logo visible uniquement sur mobile */}
          <div className="lg:hidden text-center mb-10">
             <h1 className="text-3xl font-bold text-violet-900">Threadly.</h1>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Connexion
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Accédez à votre espace Threadly
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="space-y-4">
              
              {/* INPUT : EMAIL */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent sm:text-sm transition-shadow"
                    placeholder="nom@exemple.com"
                  />
                </div>
              </div>

              {/* INPUT : MOT DE PASSE */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-violet-600 hover:text-violet-500 transition-colors">
                      Oublié ?
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent sm:text-sm transition-shadow"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* BOUTON SUBMIT */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <span className="flex items-center">
                  Se connecter <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </button>
          </form>

          {/* FOOTER LIENS */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Nouveau sur Threadly ?{' '}
              <Link href="/pre_connexion/Inscriptions" className="font-medium text-violet-600 hover:text-violet-500">
                Créer un compte
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}