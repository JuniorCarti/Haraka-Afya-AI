
import React, { useState } from 'react';
import { ArrowLeft, Users, Calendar, Video, Heart, MessageCircle, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface HealthCommunityProps {
  onBack: () => void;
}

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface UpcomingEvent {
  id: string;
  title: string;
  type: 'prayer' | 'consultation' | 'support';
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
}

const HealthCommunity: React.FC<HealthCommunityProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'events'>('posts');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const posts: CommunityPost[] = [
    {
      id: '1',
      author: 'Sarah M.',
      avatar: 'SM',
      title: 'My Journey with Breast Cancer - 5 Years Strong',
      content: 'Today marks 5 years since my diagnosis. I want to share hope with everyone fighting this battle. The journey was tough, but with faith, family support, and amazing doctors, I made it through...',
      category: 'Cancer Survivor',
      likes: 45,
      comments: 12,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      author: 'Dr. James K.',
      avatar: 'JK',
      title: 'Managing Diabetes: Tips from a Specialist',
      content: 'As an endocrinologist, I want to share some practical tips for managing diabetes effectively. Regular monitoring, proper diet, and exercise are key...',
      category: 'Diabetes',
      likes: 32,
      comments: 8,
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      author: 'Mary W.',
      avatar: 'MW',
      title: 'Living with Arthritis - Daily Exercises That Help',
      content: 'Been managing arthritis for 10 years now. Here are some gentle exercises that have really helped me maintain mobility and reduce pain...',
      category: 'Arthritis',
      likes: 28,
      comments: 15,
      timestamp: '1 day ago'
    }
  ];

  const upcomingEvents: UpcomingEvent[] = [
    {
      id: '1',
      title: 'Prayer & Healing Circle',
      type: 'prayer',
      date: '2025-01-08',
      time: '19:00',
      participants: 24,
      maxParticipants: 50
    },
    {
      id: '2',
      title: 'Pediatric Health Consultation',
      type: 'consultation',
      date: '2025-01-10',
      time: '15:00',
      participants: 8,
      maxParticipants: 20
    },
    {
      id: '3',
      title: 'Cancer Survivors Support Group',
      type: 'support',
      date: '2025-01-12',
      time: '18:00',
      participants: 15,
      maxParticipants: 30
    }
  ];

  const categories = ['All', 'Cancer Survivor', 'Diabetes', 'Arthritis', 'Mental Health', 'Heart Disease'];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'prayer': return <Heart className="w-4 h-4" />;
      case 'consultation': return <Users className="w-4 h-4" />;
      case 'support': return <MessageCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'prayer': return 'bg-purple-100 text-purple-800';
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'support': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Health Community
            </h1>
            <Button size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'posts'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Community Posts
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'events'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming Events
          </button>
        </div>

        {activeTab === 'posts' && (
          <>
            {/* Categories */}
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{post.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{post.author}</h3>
                        <span className="text-xs text-gray-500">{post.timestamp}</span>
                      </div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs bg-primary/10 text-primary mt-1`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.content}</p>
                  
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {event.date}
                        </span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventColor(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {event.participants}/{event.maxParticipants} participants
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Video className="w-4 h-4 mr-2" />
                    Join Meeting
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthCommunity;
