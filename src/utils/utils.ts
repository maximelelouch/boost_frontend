export const getFullImageUrl = (url: string | undefined | null): string => {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  if (!url) {
    return '/default-avatar.svg';
  }
  if (url.startsWith('http')) {
    return url;
  }
  return `${backendUrl}${url}`;
};

 export type EntityHrefKind = 'user' | 'page';

 export function getEntityHref(kind: EntityHrefKind, id: string | number) {
   if (kind === 'page') {
     return `/post_connexion/pages/${id}`;
   }
   return `/post_connexion/Profils/${id}`;
 }
