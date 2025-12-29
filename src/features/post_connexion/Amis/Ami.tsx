// src/features/post_connexion/Amis/Ami.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RequestCard from './components/RequestCard';
import SuggestionCard from './components/SuggestionCard';
import { MOCK_REQUESTS, MOCK_SUGGESTIONS } from './data';

const SUGGESTIONS_PER_PAGE = 5;
const REQUESTS_INITIAL_LIMIT = 3;

export default function Amis() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [suggestions, setSuggestions] = useState(MOCK_SUGGESTIONS);
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Logique de tri et de pagination pour les suggestions
  const sortedSuggestions = useMemo(() => 
    [...suggestions].sort((a, b) => b.mutualFriends - a.mutualFriends), 
    [suggestions]
  );

  const totalPages = Math.ceil(sortedSuggestions.length / SUGGESTIONS_PER_PAGE);
  const paginatedSuggestions = sortedSuggestions.slice(
    (currentPage - 1) * SUGGESTIONS_PER_PAGE,
    currentPage * SUGGESTIONS_PER_PAGE
  );

  const displayedRequests = showAllRequests ? requests : requests.slice(0, REQUESTS_INITIAL_LIMIT);

  const handleRequestAction = (id: number) => {
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  const handleSuggestionAction = (id: number) => {
    setSuggestions(prev => prev.filter(sug => sug.id !== id));
  };
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Amis</h1>
          <p className="text-gray-500 dark:text-gray-400">Gérez vos invitations et découvrez de nouvelles personnes.</p>
        </div>

        {/* SECTION 1 : INVITATIONS */}
        {requests.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                Invitations reçues
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {requests.length}
                </span>
              </h2>
              {requests.length > REQUESTS_INITIAL_LIMIT && (
                <button 
                  onClick={() => setShowAllRequests(!showAllRequests)}
                  className="text-purple-600 dark:text-purple-400 text-sm font-semibold hover:underline"
                >
                  {showAllRequests ? 'Voir moins' : 'Voir tout'}
                </button>
              )}
            </div>

            <motion.div layout className="flex flex-col gap-2">
              <AnimatePresence>
                {displayedRequests.map((request) => (
                  <motion.div key={request.id} layout variants={cardVariants} initial="initial" animate="animate" exit="exit">
                    <RequestCard user={request} onConfirm={() => handleRequestAction(request.id)} onRemove={() => handleRequestAction(request.id)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </section>
        )}

        <hr className="border-gray-200 dark:border-gray-700 mb-12" />

        {/* SECTION 2 : SUGGESTIONS */}
        <section>
          <h2 className="text-xl font-bold mb-6">Connaissez-vous ces personnes ?</h2>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {paginatedSuggestions.map((suggestion) => (
                <motion.div key={suggestion.id} layout variants={cardVariants} initial="initial" animate="animate" exit="exit">
                    <SuggestionCard user={suggestion} onAdd={() => handleSuggestionAction(suggestion.id)} onRemove={() => handleSuggestionAction(suggestion.id)} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Précédent
              </button>
              <span className='font-medium text-gray-600 dark:text-gray-300'>
                Page {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Suivant
              </button>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}