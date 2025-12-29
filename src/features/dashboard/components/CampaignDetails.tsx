// src/features/dashboard/components/CampaignDetails.tsx
'use client';

import React from 'react';
import { Campaign } from '../types';
import PerformanceChart from './PerformanceChart';
import { BarChart, Calendar, DollarSign, Eye, GitFork, Heart, MessageSquare, Target, Users } from 'lucide-react';

interface CampaignDetailsProps {
  campaign: Campaign;
}

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex items-center gap-4">
    <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded-md">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p>
    </div>
  </div>
);

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign }) => {
  return (
    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{campaign.name}</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{campaign.type} &bull; <span className="capitalize">{campaign.status}</span></p>

      {/* Section des statistiques clés */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Eye size={20} className="text-gray-600 dark:text-gray-300" />} label="Vues totales" value={campaign.stats.totalViews} />
        <StatCard icon={<Heart size={20} className="text-red-500" />} label="Likes totaux" value={campaign.stats.totalLikes} />
        <StatCard icon={<MessageSquare size={20} className="text-blue-500" />} label="Commentaires" value={campaign.stats.totalComments} />
        <StatCard icon={<GitFork size={20} className="text-green-500" />} label="Partages" value={campaign.stats.totalShares} />
      </div>

      {/* Section du graphique */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2"><BarChart size={20} /> Performance quotidienne</h3>
        <div className="h-80 w-full bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <PerformanceChart data={campaign.stats.daily} />
        </div>
      </div>

      {/* Section Audience & Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2"><Target size={20} /> Audience</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Lieu:</span> <span className="font-medium">{campaign.audience.location}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Âge:</span> <span className="font-medium">{campaign.audience.ageRange}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Genre:</span> <span className="font-medium">{campaign.audience.gender}</span></div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-2">Intérêts:</p>
              <div className="flex flex-wrap gap-2">
                {campaign.audience.interests.map(interest => (
                  <span key={interest} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{interest}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2"><DollarSign size={20} /> Budget & Durée</h3>
          <div className="space-y-3 text-sm">
             <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Budget total:</span> <span className="font-medium text-lg text-green-600">{campaign.budget}$</span></div>
             <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Date de début:</span> <span className="font-medium">{new Date(campaign.startDate).toLocaleDateString()}</span></div>
             <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Date de fin:</span> <span className="font-medium">{new Date(campaign.endDate).toLocaleDateString()}</span></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CampaignDetails;
