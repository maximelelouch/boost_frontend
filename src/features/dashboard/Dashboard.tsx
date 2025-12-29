'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_CAMPAIGNS } from './data';
import CampaignList from './components/CampaignList';
import CampaignDetails from './components/CampaignDetails';
import { AnimatePresence, motion } from 'framer-motion';

const Dashboard = () => {
  const [campaigns] = useState(MOCK_CAMPAIGNS);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(campaigns[0]?.id || null);

  const selectedCampaign = useMemo(() => 
    campaigns.find(c => c.id === selectedCampaignId),
    [campaigns, selectedCampaignId]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tableau de bord des campagnes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Analysez les performances de vos boosts.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <CampaignList 
              campaigns={campaigns}
              selectedCampaignId={selectedCampaignId}
              onSelectCampaign={setSelectedCampaignId}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <AnimatePresence mode="wait">
              {selectedCampaign ? (
                <motion.div
                  key={selectedCampaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <CampaignDetails campaign={selectedCampaign} />
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full bg-white dark:bg-gray-800/50 p-8 rounded-xl shadow-sm text-center border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">Sélectionnez une campagne pour voir les détails.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
