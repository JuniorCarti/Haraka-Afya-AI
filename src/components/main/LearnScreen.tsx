import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, TrendingUp, Heart, Shield, Users } from 'lucide-react';
import { Button } from '../ui/button';
import ArticleDetailView from '../learn/ArticleDetailView';
import PostStoryForm from '../learn/PostStoryForm';

interface LearnScreenProps {
  onNavigate: (screen: string) => void;
}

const LearnScreen: React.FC<LearnScreenProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [showPostStoryForm, setShowPostStoryForm] = useState(false);

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'prevention', label: 'Prevention' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'mental', label: 'Mental Health' },
    { id: 'fitness', label: 'Fitness' }
  ];

  const articles = [
    {
      id: 1,
      title: 'Understanding Malaria Prevention in Kenya',
      category: 'prevention',
      readTime: '5 min read',
      author: 'Dr. Sarah Wanjiku',
      date: '2 days ago',
      image: '/placeholder.svg',
      description: 'Essential tips for protecting yourself and your family from malaria',
      fullContent: 'Malaria remains one of the leading health concerns in Kenya, particularly affecting children under five and pregnant women. This comprehensive guide covers prevention strategies, early detection, and treatment options.\n\nPrevention is always better than cure. Use insecticide-treated bed nets, eliminate standing water around your home, and consider indoor residual spraying. Early symptoms include fever, chills, headache, and body aches.\n\nIf you suspect malaria, seek immediate medical attention. Rapid diagnostic tests are available at most health facilities. With proper prevention and early treatment, malaria is completely preventable and treatable.',
      trending: true
    },
    {
      id: 2,
      title: 'Healthy Eating on a Budget',
      category: 'nutrition',
      readTime: '8 min read',
      author: 'Nutritionist Mary Kibet',
      date: '1 week ago',
      image: '/placeholder.svg',
      description: 'How to maintain a nutritious diet without breaking the bank',
      fullContent: 'Eating healthy doesn\'t have to be expensive. With proper planning and smart shopping, you can maintain a nutritious diet on any budget.\n\nFocus on local, seasonal produce which is often cheaper and more nutritious. Buy grains and legumes in bulk. Plan your meals around affordable protein sources like beans, lentils, and eggs.\n\nCook at home more often and prepare meals in batches. This not only saves money but also helps you control ingredients and portions. Remember, investing in your health through good nutrition is one of the best investments you can make.'
    },
    {
      id: 3,
      title: 'Managing Stress in Urban Kenya',
      category: 'mental',
      readTime: '6 min read',
      author: 'Dr. James Mwangi',
      date: '3 days ago',
      image: '/placeholder.svg',
      description: 'Practical strategies for mental wellness in busy city life',
      fullContent: 'Urban life in Kenya presents unique stressors - traffic, noise, work pressure, and social challenges. However, there are effective ways to manage stress and maintain mental wellness.\n\nPractice deep breathing exercises during traffic jams. Take regular breaks from work and social media. Find green spaces for relaxation, even if it\'s just a small park.\n\nStay connected with family and friends. Don\'t hesitate to seek professional help when needed. Remember, taking care of your mental health is just as important as physical health.'
    },
    {
      id: 4,
      title: 'Home Exercises Without Equipment',
      category: 'fitness',
      readTime: '10 min read',
      author: 'Fitness Expert Ann Njoroge',
      date: '5 days ago',
      image: '/placeholder.svg',
      description: 'Stay fit with simple exercises you can do anywhere',
      fullContent: 'You don\'t need expensive gym equipment to stay fit. These simple exercises can be done at home, in the office, or anywhere you have a small space.\n\nStart with bodyweight exercises like push-ups, squats, lunges, and planks. Use water bottles as weights. Take the stairs instead of elevators. Walk or jog in place while watching TV.\n\nConsistency is key. Even 15-20 minutes of daily activity can make a significant difference in your health and fitness levels.'
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const dailyTips = [
    "Drink at least 8 glasses of water daily",
    "Take a 10-minute walk after meals",
    "Practice deep breathing for stress relief",
    "Wash hands frequently to prevent infections"
  ];

  const handleStoryPosted = (newStory: any) => {
    // In a real app, this would save to backend
    console.log('New story posted:', newStory);
    setShowPostStoryForm(false);
    // You could also navigate to community to show the new post
    alert('Your story has been posted to the community!');
  };

  if (selectedArticle) {
    return (
      <ArticleDetailView 
        article={selectedArticle}
        onBack={() => setSelectedArticle(null)}
        onPostStory={() => setShowPostStoryForm(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 to-gold/3 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('home')}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Health Education</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Daily Tips */}
        <div className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center mr-3">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Today's Health Tips</h2>
          </div>
          <div className="space-y-2">
            {dailyTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-primary">{index + 1}</span>
                </div>
                <p className="text-gray-700 text-sm flex-1">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Health Articles</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div 
                key={article.id} 
                className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="flex space-x-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      {article.trending && (
                        <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium ml-2">
                          <TrendingUp className="w-3 h-3 inline mr-1" />
                          Trending
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs mb-3">{article.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span>{article.author}</span>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white rounded-2xl p-4 shadow-sm text-left">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Medical Dictionary</h3>
            <p className="text-sm text-gray-500">Look up medical terms</p>
          </button>
          <button className="bg-white rounded-2xl p-4 shadow-sm text-left">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Community</h3>
            <p className="text-sm text-gray-500">Join health discussions</p>
          </button>
        </div>
      </div>

      {/* Post Story Form Modal */}
      {showPostStoryForm && (
        <PostStoryForm 
          onSave={handleStoryPosted}
          onCancel={() => setShowPostStoryForm(false)}
        />
      )}
    </div>
  );
};

export default LearnScreen;
