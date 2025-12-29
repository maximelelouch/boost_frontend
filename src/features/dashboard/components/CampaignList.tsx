// src/features/dashboard/components/CampaignList.tsx
'use client';

import React from 'react';
import { Campaign } from '../types';
import { motion } from 'framer-motion';

interface CampaignListProps {
  campaigns: Campaign[];
  selectedCampaignId: string | null;
  onSelectCampaign: (id: string) => void;
}

const CampaignListItem = ({ campaign, isSelected, onSelect }: { campaign: Campaign, isSelected: boolean, onSelect: () => void }) => {
  const statusClasses = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    completed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  };

  return (
    <motion.button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-800'}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-gray-900 dark:text-white">{campaign.name}</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusClasses[campaign.status]}`}>
          {campaign.status}
        </span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{campaign.type}</p>
      <div className="flex justify-between items-end mt-3">
        <div className="text-sm">
          <span className="font-semibold text-gray-800 dark:text-gray-200">{campaign.stats.totalViews.toLocaleString()}</span>
          <span className="text-gray-500 dark:text-gray-400"> vues</span>
        </div>
        <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {campaign.budget}$ <span className="font-normal text-gray-500">budget</span>
        </div>
      </div>
    </motion.button>
  );
};

const CampaignList: React.FC<CampaignListProps> = ({ campaigns, selectedCampaignId, onSelectCampaign }) => {
  return (
    <div className="bg-white dark:bg-gray-800/50 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 px-2">Toutes les campagnes</h2>
      <div className="space-y-2">
        {campaigns.map(campaign => (
          <CampaignListItem 
            key={campaign.id}
            campaign={campaign}
            isSelected={selectedCampaignId === campaign.id}
            onSelect={() => onSelectCampaign(campaign.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
