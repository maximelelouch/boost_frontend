"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PostCard from './PostCard';
import { Post, User, users } from '../types';
import { UserProfileProps } from '../types';
import FriendList from './FriendList';
import PhotoGallery from './PhotoGallery';
import { AnimatePresence, motion } from 'framer-motion';
import TabButton from './TabButton';

const UserProfile = ({ userId }: UserProfileProps) => {
  const router = useRouter();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'friends' | 'photos'>('posts');

  // Gérer le like d'un post
  const handleLike = (postId: string) => {
    setUserPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = post.liked;
          return {
            ...post,
            liked: !isLiked,
            likes: isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      })
    );
  };

  // Gérer l'ajout d'un commentaire
  const handleComment = (postId: string, commentText: string) => {
    setUserPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: `comment-${Date.now()}`,
            user: {
              id: 'current-user',
              name: 'You',
              avatar: '/default-avatar.png'
            },
            content: commentText,
            likes: 0,
            createdAt: new Date().toISOString()
          };
          
          return {
            ...post,
            comments: [newComment, ...post.comments],
            commentsCount: post.commentsCount + 1,
            newComment: ''
          };
        }
        return post;
      })
    );
  };

  // Gérer le partage d'un post
  const handleShare = (postId: string) => {
    setUserPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            shared: !post.shared,
            shares: post.shared ? post.shares - 1 : post.shares + 1
          };
        }
        return post;
      })
    );
  };

  // Basculer l'affichage des commentaires
  const toggleComments = (postId: string) => {
    setUserPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            showComments: !post.showComments
          };
        }
        return post;
      })
    );
  };

  // Charger les données de l'utilisateur et ses publications
  useEffect(() => {
    // Simuler un chargement asynchrone
    const loadUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Log de debug - Début du chargement
        await fetch('/api/debug-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'INFO',
            message: 'Début du chargement UserProfile',
            data: { userId }
          })
        }).catch(console.error);
        
        // Simulation de chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Log de debug - Liste des utilisateurs disponibles
        await fetch('/api/debug-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'INFO',
            message: 'Utilisateurs disponibles',
            data: { 
              userIds: users.map(u => u.id),
              searchingFor: userId,
              totalUsers: users.length
            }
          })
        }).catch(console.error);
        
        const foundUser = users.find(u => u.id === userId);
        
        if (!foundUser) {
          // Log de debug - Utilisateur non trouvé
          await fetch('/api/debug-log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'ERROR',
              message: 'Utilisateur non trouvé - Redirection vers 404',
              data: { 
                userId,
                availableUserIds: users.map(u => u.id)
              }
            })
          }).catch(console.error);
          
          router.push('/404');
          return;
        }
        
        setUser(foundUser);
        
        // Log de debug - Utilisateur trouvé
        await fetch('/api/debug-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'SUCCESS',
            message: 'Utilisateur trouvé',
            data: { 
              userId: foundUser.id,
              userName: foundUser.name
            }
          })
        }).catch(console.error);
        
        // Importer dynamiquement les posts pour le chargement côté client
        const { posts } = await import('../data/mock-posts');
        const filteredPosts = posts.filter((post: Post) => post.user.id === userId);
        setUserPosts(filteredPosts);
        
        // Log de debug - Posts chargés
        await fetch('/api/debug-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'SUCCESS',
            message: 'Posts chargés',
            data: { 
              userId,
              postsCount: filteredPosts.length
            }
          })
        }).catch(console.error);
        
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        
        // Log de debug - Erreur
        await fetch('/api/debug-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'ERROR',
            message: 'Erreur lors du chargement',
            data: { 
              userId,
              error: err instanceof Error ? err.message : String(err)
            }
          })
        }).catch(console.error);
        
        setError('Impossible de charger les données du profil. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUserData();
    }
  }, [userId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p>Utilisateur non trouvé</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-b-lg">
          {/* Cover Photo */}
          <div className="relative h-48 sm:h-64 w-full">
            {user.coverPhoto ? (
              <Image
                src={user.coverPhoto}
                alt={`${user.name}'s cover photo`}
                layout="fill"
                className="object-cover w-full h-full rounded-t-lg"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-400 rounded-t-lg"></div>
            )}
          </div>

          {/* Profile Info */}
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg flex-shrink-0">
                <Image
                  src={user.avatar}
                  alt={`${user.name}'s profile`}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-grow text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                <div className="flex justify-center sm:justify-start space-x-6 mt-2 text-gray-600 dark:text-gray-300">
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">{userPosts.length}</span>
                    <span className="text-sm ml-1">Publications</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">{user.followers?.toLocaleString() || '0'}</span>
                    <span className="text-sm ml-1">Abonnés</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">{user.following?.toLocaleString() || '0'}</span>
                    <span className="text-sm ml-1">Abonnements</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold transition-colors shadow-sm">
                  Suivre
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-2">
          <div className="flex space-x-2">
            <TabButton name="Publications" activeTab={activeTab} onClick={() => setActiveTab('posts')} />
            <TabButton name="Amis" activeTab={activeTab} onClick={() => setActiveTab('friends')} />
            <TabButton name="Photos" activeTab={activeTab} onClick={() => setActiveTab('photos')} />
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'posts' && (
                userPosts.length > 0 ? (
                  <div className="space-y-6">
                    {userPosts.map((post) => (
                      <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} onShare={handleShare} onToggleComments={toggleComments} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                    <p>Aucune publication à afficher.</p>
                  </div>
                )
              )}
              {activeTab === 'friends' && <FriendList user={user} />}
              {activeTab === 'photos' && <PhotoGallery user={user} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;