// src/features/post_connexion/Amis/data.ts
import { FriendUser } from "./types";

export const MOCK_REQUESTS: FriendUser[] = [
  { id: 1, name: 'Sophie Martin', avatar: 'https://i.pravatar.cc/150?u=1', mutualFriends: 12 },
  { id: 2, name: 'Lucas Dubois', avatar: 'https://i.pravatar.cc/150?u=2', mutualFriends: 5 },
  { id: 3, name: 'Emma Bernard', avatar: 'https://i.pravatar.cc/150?u=3', mutualFriends: 8 },
];

export const MOCK_SUGGESTIONS: FriendUser[] = [
  { id: 10, name: 'Thomas Leroy', avatar: 'https://i.pravatar.cc/300?u=10', mutualFriends: 45 },
  { id: 11, name: 'Chloé Petit', avatar: 'https://i.pravatar.cc/300?u=11', mutualFriends: 2 },
  { id: 12, name: 'Nicolas Moreau', avatar: 'https://i.pravatar.cc/300?u=12', mutualFriends: 18 },
  { id: 13, name: 'Julie Garcia', avatar: 'https://i.pravatar.cc/300?u=13', mutualFriends: 33 },
  { id: 14, name: 'Antoine Roux', avatar: 'https://i.pravatar.cc/300?u=14', mutualFriends: 7 },
  { id: 15, name: 'Léa Fournier', avatar: 'https://i.pravatar.cc/300?u=15', mutualFriends: 24 },
];