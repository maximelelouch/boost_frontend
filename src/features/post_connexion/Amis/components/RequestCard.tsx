// src/features/post_connexion/Amis/components/RequestCard.tsx
import React from 'react';
import { Users } from 'lucide-react';
import { FriendUser } from '../types';

interface RequestCardProps {
  user: FriendUser;
}

const RequestCard: React.FC<RequestCardProps> = ({ user }) => {
  return (
    <div className="flex items-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 w-full mb-3">
      {/* Photo de profil */}
      <div className="relative w-20 h-20 flex-shrink-0 mr-4">
        {/* Note: Utilisez <Image /> de next/image en prod si configuré, sinon img standard */}
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover rounded-full border-2 border-gray-100"
        />
      </div>

      {/* Infos et Actions */}
      <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{user.name}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Users size={14} />
            {user.mutualFriends} amis en commun
          </p>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm">
            Confirmer
          </button>
          <button className="flex-1 sm:flex-none px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors text-sm">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;