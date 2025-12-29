import React, { useState } from 'react';
import { Post, posts as initialPosts } from '../data/mock-posts';
import PostCard from './PostCard';

const NewsFeed = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  // Gérer le like d'un post
  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.liked;
        return {
          ...post,
          liked: !isLiked,
          likes: isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Gérer l'ajout d'un commentaire
  const handleComment = (postId: string, commentText: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: `comment-${Date.now()}`,
          user: {
            id: 'current-user', // À remplacer par l'ID de l'utilisateur connecté
            name: 'You',
            avatar: '/default-avatar.png' // À remplacer par l'avatar de l'utilisateur connecté
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
    }));
  };

  // Gérer le partage d'un post
  const handleShare = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          shared: !post.shared,
          shares: post.shared ? post.shares - 1 : post.shares + 1
        };
      }
      return post;
    }));
    
    // Ici, vous pouvez ajouter la logique pour partager le post sur les réseaux sociaux
    console.log(`Sharing post ${postId}`);
  };

  // Basculer l'affichage des commentaires
  const toggleComments = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          showComments: !post.showComments
        };
      }
      return post;
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white my-4">News Feed</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
            onToggleComments={toggleComments}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
