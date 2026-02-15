// lib/config/api.config.ts

export const API_CONFIG = {
  // Utiliser 127.0.0.1 évite les bugs de résolution DNS sur Windows/Node
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
  timeout: 30000,
  
  endpoints: {
    auth: {
      login: '/api/token/',
      register: '/api/auth/users/',
      me: '/api/auth/users/me/',
      refresh: '/api/token/refresh/',
    },
    // Utilisateurs (auth / djoser)
    users: '/api/auth/users/',
    // Utilisateurs (core) : friends / mutual_friends
    coreUsers: '/api/users/',
    posts: '/api/posts/',
    pages: '/api/pages/',
    boosts: '/api/boosts/',
    comments: '/api/comments/',
    upload: '/api/upload/',
    // CHANGEMENT ICI : Renommé 'friends' en 'friendships' pour matcher le service
    friendships: '/api/friendships/', 
    feed: '/api/feed/',
    search: '/api/search/',
  },
} as const;