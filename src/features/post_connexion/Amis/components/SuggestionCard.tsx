// src/features/post_connexion/Amis/components/SuggestionCard.tsx
import React from 'react';
import { UserPlus, Users } from 'lucide-react';
import { FriendUser } from '../types';
import Image from 'next/image';

interface SuggestionCardProps {
  user: FriendUser;
  onAdd: () => void;
  onRemove: () => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ user, onAdd, onRemove }) => {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
      <div className="relative w-full aspect-square bg-gray-100">
        <Image
          src={user.avatar}
          alt={user.name}
          layout="fill"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 truncate">{user.name}</h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
          <Users size={14} />
          {user.mutualFriends} amis en commun
        </p>

        <div className="mt-auto flex flex-col gap-2">
          <button onClick={onAdd} className="w-full py-2 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
            <UserPlus size={18} />
            Ajouter
          </button>
          <button onClick={onRemove} className="w-full py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-medium rounded-lg transition-colors text-sm">
            Retirer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;