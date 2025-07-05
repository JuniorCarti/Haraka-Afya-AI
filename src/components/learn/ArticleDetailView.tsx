
import React from 'react';
import { ArrowLeft, Clock, User, Heart, MessageCircle, Share2, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface Article {
  id: number;
  title: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  description: string;
  fullContent: string;
  trending?: boolean;
}

interface ArticleDetailViewProps {
  article: Article;
  onBack: () => void;
  onPostStory: () => void;
}

const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ article, onBack, onPostStory }) => {
  const handleShare = () => {
    const shareText = `Join the Haraka-Afya community. Read health stories, learn, and share.\n👉 Download the App\n\n"${article.title}" - ${article.author}`;
    
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Share text copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Health Article</h1>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Article Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="w-full h-48 bg-gray-100 rounded-xl mb-4"></div>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
              {article.category}
            </span>
            {article.trending && (
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                Trending
              </span>
            )}
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{article.title}</h1>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime}
              </div>
              <span>{article.date}</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-6">{article.description}</p>
            <div className="space-y-4">
              {article.fullContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Interaction Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Like</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">Comment</span>
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
        </div>

        {/* Post Your Story CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-2xl p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Health Journey</h3>
            <p className="text-gray-600 mb-4">Have a health story or experience to share? Help others by posting your journey.</p>
            <Button onClick={onPostStory} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Post Your Story
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailView;
