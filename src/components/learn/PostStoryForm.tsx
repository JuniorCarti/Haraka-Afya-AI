
import React, { useState } from 'react';
import { X, Save, Image, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface PostStoryFormProps {
  onSave: (story: any) => void;
  onCancel: () => void;
}

const PostStoryForm: React.FC<PostStoryFormProps> = ({ onSave, onCancel }) => {
  const [story, setStory] = useState({
    title: '',
    category: '',
    content: '',
    image: null as File | null
  });

  const categories = ['Cancer Survivor', 'Diabetes', 'Arthritis', 'Mental Health', 'Heart Disease', 'General Health'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!story.title.trim() || !story.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }
    
    const newStory = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'YU',
      title: story.title,
      content: story.content.substring(0, 150) + (story.content.length > 150 ? '...' : ''),
      fullContent: story.content,
      category: story.category || 'General Health',
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      isLiked: false
    };
    
    onSave(newStory);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStory(prev => ({ ...prev, image: file }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="border-b p-4 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-semibold flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Share Your Health Story
          </h2>
          <Button size="sm" onClick={handleSubmit}>
            <Save className="w-4 h-4 mr-2" />
            Post Story
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Story Title</label>
            <Input
              value={story.title}
              onChange={(e) => setStory(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Share your inspiring health journey title..."
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={story.category}
              onChange={(e) => setStory(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Story</label>
            <textarea
              value={story.content}
              onChange={(e) => setStory(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share your health journey, experiences, tips, or advice that could help others..."
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={8}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Add Image (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {story.image ? story.image.name : 'Click to upload an image'}
                </p>
              </label>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Community Guidelines:</strong> Share authentic experiences that can help others. 
              Please respect privacy and avoid sharing personal medical details that could identify specific individuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostStoryForm;
