"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Heart, Share, X, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Post, Comment, CommentItemProps } from '../types';

import { PostCardProps } from '../types';

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);
  
  return (
    <div className="mt-3">
      <div className="flex items-start">
        <Image
          src={comment.user.avatar}
          alt={comment.user.name}
          width={32}
          height={32}
          className="rounded-full mt-1"
        />
        <div className="ml-2 flex-1">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3">
            <p className="font-semibold text-sm">{comment.user.name}</p>
            <p className="text-sm">{comment.content}</p>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 ml-2">
            <span className="cursor-pointer hover:underline mr-3">Like</span>
            <span className="cursor-pointer hover:underline">Reply</span>
            <span className="ml-2">{comment.likes > 0 && `${comment.likes} likes`}</span>
          </div>
          
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2 ml-4 border-l-2 border-gray-200 dark:border-gray-600 pl-3">
              <button 
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center text-xs text-blue-500 hover:underline"
              >
                {showReplies ? (
                  <>
                    <ChevronUp size={14} className="mr-1" />
                    Hide replies
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} className="mr-1" />
                    {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                  </>
                )}
              </button>
              
              {showReplies && (
                <div className="mt-2 space-y-2">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="flex items-start mt-2">
                      <Image
                        src={reply.user.avatar}
                        alt={reply.user.name}
                        width={24}
                        height={24}
                        className="rounded-full mt-1"
                      />
                      <div className="ml-2">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-2">
                          <p className="font-semibold text-xs">{reply.user.name}</p>
                          <p className="text-xs">{reply.content}</p>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 ml-2">
                          <span className="cursor-pointer hover:underline mr-3">Like</span>
                          <span>{reply.likes > 0 && `${reply.likes} likes`}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onLike, 
  onComment, 
  onShare, 
  onToggleComments 
}) => {
  const [commentText, setCommentText] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const router = useRouter();
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    onLike(post.id);
  };
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    onShare(post.id);
  };
  
  const toggleComments = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggleComments(post.id);
    if (!post.showComments) {
      setShowAllComments(true);
    }
  };
  
  const displayedComments = showAllComments 
    ? post.comments 
    : post.comments.slice(0, 2);

  // Fonction de navigation avec vérifications et logs côté serveur
  const navigateToProfile = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Vérification de l'existence de l'ID
    if (!post?.user?.id) {
      // Log côté serveur via API
      await fetch('/api/debug-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'ERROR',
          message: 'User ID est manquant',
          data: {
            postId: post?.id,
            user: post?.user
          }
        })
      }).catch(err => console.error('Erreur lors du log:', err));
      
      alert('Impossible d\'accéder au profil: ID utilisateur manquant');
      return;
    }
    
    const profileUrl = `/profile/${post.user.id}`;
    
    // Log côté serveur de la navigation
    await fetch('/api/debug-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'INFO',
        message: 'Navigation vers profil',
        data: {
          userId: post.user.id,
          userName: post.user.name,
          profileUrl: profileUrl
        }
      })
    }).catch(err => console.error('Erreur lors du log:', err));
    
    try {
      router.push(profileUrl);
    } catch (error) {
      // Log de l'erreur côté serveur
      await fetch('/api/debug-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'ERROR',
          message: 'Erreur lors de la navigation',
          data: {
            error: error instanceof Error ? error.message : String(error),
            profileUrl: profileUrl
          }
        })
      }).catch(err => console.error('Erreur lors du log:', err));
      
      alert('Erreur lors de la navigation vers le profil');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4">
      {/* En-tête du post */}
      <div className="p-4 flex items-center">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigateToProfile(e);
          }}
          className="focus:outline-none"
          aria-label={`Voir le profil de ${post.user.name}`}
        >
          <div className="relative">
            <Image
              src={post.user.avatar}
              alt={`${post.user.name}'s profile`}
              width={40}
              height={40}
              className="rounded-full hover:opacity-90 transition-opacity"
            />
          </div>
        </button>
        <div className="ml-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigateToProfile(e);
            }}
            className="focus:outline-none text-left"
          >
            <h3 className="font-medium text-gray-900 dark:text-white hover:underline">
              {post.user.name}
            </h3>
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400">{post.createdAt}</p>
        </div>
        <button className="ml-auto text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      {post.image && (
        <div className="relative w-full h-96">
          <Image
            src={post.image}
            alt="Post image"
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <div className="bg-blue-500 text-white rounded-full p-1">
              <ThumbsUp size={12} />
            </div>
            <span className="ml-1">{post.likes}</span>
          </div>
          <div className='flex gap-4'>
            <button 
              onClick={toggleComments}
              className="hover:underline"
            >
              {post.commentsCount} Comments
            </button>
            <button 
              onClick={handleShare}
              className="hover:underline"
            >
              {post.shares} Shares
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
        
        <div className="flex justify-around text-gray-600 dark:text-gray-300">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 w-full justify-center ${post.liked ? 'text-blue-500' : ''}`}
          >
            {post.liked ? (
              <Heart size={20} className="fill-current" />
            ) : (
              <ThumbsUp size={20} />
            )}
            <span>Like</span>
          </button>
          
          <button 
            onClick={toggleComments}
            className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 w-full justify-center"
          >
            <MessageCircle size={20} />
            <span>Comment</span>
          </button>
          
          <button 
            onClick={handleShare}
            className={`flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 w-full justify-center ${post.shared ? 'text-green-500' : ''}`}
          >
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>
        
        {/* Comment Section */}
        {post.showComments && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {/* Comment input */}
            <form onSubmit={handleCommentSubmit} className="flex items-start mb-4">
              <Image
                src="/default-avatar.png"
                alt="Your profile"
                width={32}
                height={32}
                className="rounded-full mt-1"
              />
              <div className="flex-1 ml-2 relative">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {commentText && (
                  <button
                    type="button"
                    onClick={() => setCommentText('')}
                    className="absolute right-10 top-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className={`absolute right-2 top-1.5 ${commentText.trim() ? 'text-blue-500' : 'text-gray-400'}`}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
            
            {/* Comments list */}
            <div className="space-y-3">
              {displayedComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
              
              {post.comments.length > 2 && !showAllComments && (
                <button
                  onClick={() => setShowAllComments(true)}
                  className="text-sm text-blue-500 hover:underline mt-2"
                >
                  View all {post.comments.length} comments
                </button>
              )}
              
              {showAllComments && post.comments.length > 2 && (
                <button
                  onClick={() => setShowAllComments(false)}
                  className="text-sm text-blue-500 hover:underline mt-2"
                >
                  Show less
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;