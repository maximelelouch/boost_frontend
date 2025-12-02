// src/features/post_connexion/Amis/Amis.tsx
'use client';

import React from 'react';
import RequestCard from './components/RequestCard';
import SuggestionCard from './components/SuggestionCard';
import { MOCK_REQUESTS, MOCK_SUGGESTIONS } from './data';

export default function Amis() {
  // Logique de tri des suggestions (Le plus d'amis en commun d'abord)
  const sortedSuggestions = [...MOCK_SUGGESTIONS].sort((a, b) => b.mutualFriends - a.mutualFriends);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header de la page */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Amis</h1>
          <p className="text-gray-500">Gérez vos invitations et découvrez de nouvelles personnes.</p>
        </div>

        {/* SECTION 1 : INVITATIONS */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              Invitations reçues
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {MOCK_REQUESTS.length}
              </span>
            </h2>
            <button className="text-blue-600 text-sm hover:underline">Voir tout</button>
          </div>

          <div className="flex flex-col gap-2">
            {MOCK_REQUESTS.map((request) => (
              <RequestCard key={request.id} user={request} />
            ))}
            {MOCK_REQUESTS.length === 0 && (
              <p className="text-gray-500 italic">Aucune invitation en attente.</p>
            )}
          </div>
        </section>

        <hr className="border-gray-200 mb-12" />

        {/* SECTION 2 : SUGGESTIONS */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            Connaissez-vous ces personnes ?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedSuggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} user={suggestion} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}