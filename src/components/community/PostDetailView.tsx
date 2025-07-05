
import React, { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { Button } from '../ui/button';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  fullContent: string;
  category: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

interface PostDetailViewProps {
  post: Post;
  onBack: () => void;
}

const PostDetailView: React.FC<PostDetailViewProps> = ({ post: initialPost, onBack }) => {
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Dr. Grace M.',
      avatar: 'GM',
      content: 'Thank you for sharing your inspiring journey. Your strength gives hope to many others.',
      timestamp: '1 hour ago',
      likes: 5
    },
    {
      id: '2',
      author: 'John K.',
      avatar: 'JK',
      content: 'God bless you for your courage. Praying for continued health and strength.',
      timestamp: '3 hours ago',
      likes: 8
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleShare = () => {
    const shareText = `Read more or download the Haraka-Afya app to learn how to protect your health today.\n\n"${post.title}" - ${post.author}`;
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Share text copied to clipboard!');
    }
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'YU',
      content: newComment,
      timestamp: 'Just now',
      likes: 0
    };

    setComments(prev => [comment, ...prev]);
    setPost(prev => ({ ...prev, comments: prev.comments + 1 }));
    setNewComment('');
    setShowCommentInput(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Post Details</h1>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Post Content */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{post.avatar}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{post.author}</h3>
                <span className="text-xs text-gray-500">{post.timestamp}</span>
              </div>
              <span className="inline-block px-2 py-1 rounded-full text-xs bg-primary/10 text-primary mt-1">
                {post.category}
              </span>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-4">{post.title}</h2>
          <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed mb-6">
            <p>{post.fullContent || post.content}</p>
          </div>
          
          {/* Interaction Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors ${
                  post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button 
                onClick={() => setShowCommentInput(!showCommentInput)}
                className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{post.comments}</span>
              </button>
            </div>
            <button 
              onClick={handleShare}
              className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-sm">Share</span>
            </button>
          </div>

          {/* Comment Input */}
          {showCommentInput && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">YU</span>
                </div>
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button size="sm" onClick={handleSubmitComment} disabled={!newComment.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <h3 className="font-semibold text-gray-900 mb-4">
            Comments ({comments.length})
          </h3>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm font-semibold">{comment.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-2xl p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 ml-3">
                    <button className="text-xs text-gray-500 hover:text-red-500 flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="text-xs text-gray-500 hover:text-blue-500">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailView;
