// src/features/post_connexion/Publicite/data.ts
import { PageData, PostData } from "./types";

export const MY_PAGE: PageData = {
  id: 'page_1',
  name: 'Tech Horizon Douala',
  category: 'Entreprise de Logiciels',
  avatar: 'https://i.pravatar.cc/150?u=tech_logo',
  cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop',
  followers: 1240,
};

export const MY_POSTS: PostData[] = [
  {
    id: 'post_1',
    content: 'Nous sommes ravis de vous présenter notre nouvelle application mobile ! 🚀 Disponible dès maintenant.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop',
    date: 'Il y a 2 heures',
    likes: 45,
    comments: 12
  },
  {
    id: 'post_2',
    content: 'Rejoignez notre équipe ! Nous recrutons des développeurs React talentueux à Douala. Envoyez vos CV.',
    date: 'Il y a 1 jour',
    likes: 89,
    comments: 34
  }
];