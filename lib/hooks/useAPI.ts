// lib/hooks/useAPI.ts
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  authService, 
  postService, 
  usersService,
  pageService, 
  boostService, 
  commentService, 
  friendService, 
  uploadService,
  searchService,
} from '@lib/api/services';
import type { 
  LoginRequest, 
  CreateUserRequest, 
  CreatePostRequest, 
  Post, 
  User, 
  Page, 
  Boost,
  CreateBoostRequest, 
  Comment, 
  Friend, 
  FriendRequest,
  SearchResults
} from '@lib/types/api.types';

// --- HOOK AUTHENTIFICATION ---
export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const tokens = await authService.login(credentials);
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);
      router.push('/post_connexion/Accueils');
    } catch (err: any) {
      setError('Email ou mot de passe incorrect.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: CreateUserRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register(userData);

      const tokens = await authService.login({
        username: userData.email,
        password: userData.password,
      });
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);
      localStorage.setItem('needs_onboarding', '1');
      router.push('/post_inscription');
    } catch (err: any) {
      const data = err?.response?.data;
      const fieldError =
        data && typeof data === 'object'
          ? Object.values(data).flat?.()?.[0]
          : null;
      setError(
        data?.detail ||
          (typeof fieldError === 'string' ? fieldError : null) ||
          (typeof data === 'string' ? data : null) ||
          "Erreur lors de l'inscription"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    router.push('/');
  };

  return { login, register, logout, isLoading, error, isAuthenticated: authService.isAuthenticated() };
}

// --- HOOK UTILISATEUR ---
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    if (!authService.isAuthenticated()) {
      setIsLoading(false);
      return;
    }
    try {
      const data = await authService.getMe();
      setUser(data);
    } catch (err: any) {
      setError("Erreur chargement profil");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchUser(); }, []);

  return { user, isLoading, error, refresh: fetchUser };
}

// --- HOOK PUBLICATIONS (FEED) ---
export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFeed = async (pageNum: number = 1, isRefresh: boolean = false) => {
    if (isLoading || (!hasMore && !isRefresh)) return;

    setIsLoading(true);
    try {
      const data = await postService.getFeed(pageNum);
      
      setPosts(prev => isRefresh ? data.results : [...prev, ...data.results]);
      
      setHasMore(data.next !== null);
      setPage(pageNum);
    } catch (err: any) {
      setError("Erreur chargement du feed");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchFeed(page + 1);
    }
  };

  const likePost = async (postId: string) => {
    try {
      await postService.like(postId);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchFeed(1, true); }, []);

  return { posts, isLoading, error, loadMore, hasMore, likePost, refresh: () => fetchFeed(1, true) };
}

// --- HOOK POSTS BOOSTABLES (MES POSTS + POSTS DE MES PAGES) ---
export function useBoostablePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMine = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await postService.getMine();
      setPosts(Array.isArray(data) ? data : (data as any)?.results || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des posts boostables:', err);
      setError('Impossible de charger vos posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMine();
  }, []);

  return { posts, isLoading, error, refresh: fetchMine };
}

// --- HOOK BOOSTS ---
export function useBoosts() {
  const [boosts, setBoosts] = useState<Boost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchBoosts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await boostService.getMyBoosts();
      setBoosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erreur lors de la récupération des boosts:', err);
      setError('Impossible de charger les boosts');
    } finally {
      setIsLoading(false);
    }
  };

  const createBoost = async (data: CreateBoostRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const boost = await boostService.create(data);
      const payment = await boostService.pay(boost.id, Number(data.budget));
      await fetchBoosts();
      return { boost, payment };
    } catch (err) {
      console.error('Erreur lors de la création du boost:', err);
      setError("Impossible de créer le boost");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoosts();
  }, []);

  return { boosts, isLoading, error, refresh: fetchBoosts, createBoost };
}

// --- HOOK COMMENTAIRES ---
export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = async () => {
    if (!postId) return;
    setIsLoading(true);
    try {
      const data = await commentService.getByPost(postId) as any;
      
      const results = data.results || (Array.isArray(data) ? data : []);
      console.log(`📡 [useComments] Commentaires récupérés pour ${postId}:`, results.length);
      setComments(results);
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des commentaires:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addComment = async (content: string) => {
    try {
      console.log("📤 [useComments] Envoi du commentaire au serveur...");
      
      const savedComment = await commentService.create({ 
        post: postId, 
        content: content 
      });

      console.log("✅ [useComments] Commentaire enregistré en DB:", savedComment);

      setComments(prev => [savedComment, ...prev]);
      
      return savedComment;
    } catch (err: any) {
      console.error("❌ [useComments] Échec de l'enregistrement:", err.response?.data);
      alert("Impossible d'enregistrer le commentaire.");
      throw err;
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return { comments, addComment, isLoading, refresh: fetchComments };
}

// --- HOOK PAGES ---
export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = async () => {
    try {
      const data = await pageService.list();
      const results = Array.isArray(data) ? data : data.results;
      setPages(results || []);
    } catch (err) {
      setError("Erreur chargement des pages");
    } finally {
      setIsLoading(false);
    }
  };

  const createPage = async (data: any) => {
    const newPage = await pageService.create(data);
    setPages(prev => [...prev, newPage]);
    return newPage;
  };

  useEffect(() => { fetchPages(); }, []);
  return { pages, isLoading, error, createPage, refresh: fetchPages };
}

// --- HOOK PAGE (SINGLE) ---
export function usePage(pageId: string) {
  const [page, setPage] = useState<Page | null>(null);
  const [pagePosts, setPagePosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPageData = useCallback(async () => {
    const cleanId = pageId?.toString().trim();
    
    if (!cleanId || cleanId === "undefined" || cleanId === "null") {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const pageData = await pageService.getById(cleanId);
      setPage(pageData);

      try {
        const postsResponse = await pageService.getPostsByPage(cleanId);
        const posts = Array.isArray(postsResponse) 
          ? postsResponse 
          : (postsResponse as any).results || [];
        setPagePosts(posts);
      } catch (postErr) {
        setPagePosts([]);
      }

    } catch (err: any) {
      setError(err.response?.status === 404 ? "Page introuvable" : "Erreur serveur");
      setPage(null);
    } finally {
      setIsLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

  return {
    page,
    pagePosts,
    isLoading,
    error,
    refresh: fetchPageData,
  };
}

export function useFriends() {
  const { user: currentUser } = useUser();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<Friend[]>([]); // Invitations reçues
  const [sentRequests, setSentRequests] = useState<Friend[]>([]); // Invitations envoyées
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFriends = useCallback(async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const data = await friendService.list();
      const results = Array.isArray(data) ? (data as any) : ((data as any).results || []);

      if (results) {
        const receivedRequests = results.filter((f: Friend) =>
          f.status === 'PENDING' && f.addressee && f.addressee.id === currentUser.id
        );

        const sentFriendRequests = results.filter((f: Friend) =>
          f.status === 'PENDING' && f.requester && f.requester.id === currentUser.id
        );

        const acceptedFriendships = results.filter((f: Friend) => f.status === 'ACCEPTED');

        setRequests(receivedRequests);
        setSentRequests(sentFriendRequests);
        setFriends(acceptedFriendships);
      }

      const suggestionsData = await friendService.getSuggestions();
      setSuggestions(suggestionsData);
    } catch (err) {
      console.error('Erreur amis:', err);
      setError("Impossible de charger la liste d'amis.");
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const updateRequest = async (requestId: string, status: 'ACCEPTED' | 'DECLINED') => {
    try {
      if (status === 'ACCEPTED') {
        await friendService.acceptRequest(requestId);
      } else {
        await friendService.declineRequest(requestId);
      }

      setRequests(prev => prev.filter(req => req.id !== requestId));
      await fetchFriends();
    } catch (err) {
      console.error(`Erreur lors de la mise à jour de la demande ${requestId}:`, err);
      alert(`Impossible de ${status === 'ACCEPTED' ? 'accepter' : 'refuser'} la demande.`);
    }
  };

  const sendRequest = async (addresseeId: string) => {
    await friendService.sendRequest(addresseeId);
    await fetchFriends();
  };

  const cancelRequest = async (friendshipId: string) => {
    await friendService.delete(friendshipId);
    await fetchFriends();
  };

  const removeFriend = async (friendshipId: string) => {
    try {
      await friendService.delete(friendshipId);
      setFriends(prev => prev.filter(f => f.id !== friendshipId));
    } catch (err) {
      console.error(`Erreur lors de la suppression de l'ami ${friendshipId}:`, err);
      alert('Impossible de supprimer cet ami.');
    }
  };

  return {
    friends,
    requests,
    sentRequests,
    suggestions,
    isLoading,
    error,
    sendRequest,
    cancelRequest,
    updateRequest,
    removeFriend,
    refresh: fetchFriends,
  };
}

export function useBoostAction() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBoost = async (targetId: string, type: 'POST' | 'PAGE', budget: number) => {
    setIsProcessing(true);
    try {
      const boost = await boostService.create({
        target_id: targetId,
        target_type: type,
        budget: budget,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
      await boostService.pay(boost.id, budget);
      return boost;
    } finally {
      setIsProcessing(false);
    }
  };

  return { handleBoost, isProcessing };
}

// --- HOOK UPLOAD ---
export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File, type: 'IMAGE' | 'VIDEO' = 'IMAGE') => {
    setIsUploading(true);
    try {
      return await uploadService.file(file, type);
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading };
}

// --- HOOK RECHERCHE ---
export function useSearch(query: string | null) {
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = useCallback(async () => {
    if (!query) {
      setResults(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await searchService.search(query);
      setResults(data);
    } catch (err) {
      setError('Erreur lors de la récupération des résultats.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return { results, isLoading, error, refresh: fetchResults };
}

// --- HOOK SOCIAL PROFIL (amis + amis en commun) ---
export function useProfileSocial(userId: string | undefined) {
  const [friends, setFriends] = useState<User[]>([]);
  const [mutualFriends, setMutualFriends] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSocial = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const [friendsData, mutualData] = await Promise.all([
        usersService.getFriends(userId),
        usersService.getMutualFriends(userId),
      ]);
      setFriends(friendsData || []);
      setMutualFriends(mutualData || []);
    } catch (err) {
      console.error('Erreur chargement social profile', err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchSocial();
  }, [fetchSocial]);

  return { friends, mutualFriends, isLoading, refresh: fetchSocial };
}

type MutualFriendsCacheEntry = {
  count: number;
  preview: User[];
  fetchedAt: number;
};

const mutualFriendsCache = new Map<string, MutualFriendsCacheEntry>();
const MUTUAL_FRIENDS_CACHE_TTL_MS = 2 * 60 * 1000;

export function useMutualFriendsCached(targetUserId: string | undefined, previewLimit: number = 4) {
  const [entry, setEntry] = useState<MutualFriendsCacheEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMutual = useCallback(async () => {
    if (!targetUserId) return;

    const cached = mutualFriendsCache.get(targetUserId);
    if (cached && Date.now() - cached.fetchedAt < MUTUAL_FRIENDS_CACHE_TTL_MS) {
      setEntry(cached);
      return;
    }

    setIsLoading(true);
    try {
      const mutual = await usersService.getMutualFriends(targetUserId);
      const normalized: MutualFriendsCacheEntry = {
        count: mutual?.length || 0,
        preview: (mutual || []).slice(0, previewLimit),
        fetchedAt: Date.now(),
      };
      mutualFriendsCache.set(targetUserId, normalized);
      setEntry(normalized);
    } catch (err) {
      console.error('Erreur mutual friends', err);
    } finally {
      setIsLoading(false);
    }
  }, [previewLimit, targetUserId]);

  useEffect(() => {
    fetchMutual();
  }, [fetchMutual]);

  return {
    mutualCount: entry?.count || 0,
    mutualPreview: entry?.preview || [],
    isLoading,
    refresh: fetchMutual,
  };
}