// src/features/post_connexion/Amis/components/SuggestionCard.tsx
import React from 'react';
import { UserPlus, Users } from 'lucide-react';
import { FriendUser } from '../types';

interface SuggestionCardProps {
  user: FriendUser;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ user }) => {
  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
      {/* Grande Image */}
      <div className="relative w-full aspect-square bg-gray-100">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenu */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{user.name}</h3>
        
        <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
          <Users size={14} />
          {user.mutualFriends} amis en commun
        </p>

        {/* Zone boutons */}
        <div className="mt-auto flex flex-col gap-2">
          <button className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
            <UserPlus size={18} />
            Ajouter
          </button>
          <button className="w-full py-2 bg-transparent hover:bg-gray-100 text-gray-500 font-medium rounded-lg transition-colors text-sm">
            Retirer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;