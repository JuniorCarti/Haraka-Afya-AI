
import React, { useState } from 'react';
import { X, Save, Activity } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface HealthStats {
  height: string;
  weight: string;
  bloodPressure: string;
  sugarLevel: string;
  heartRate: string;
  bloodType: string;
}

interface HealthStatsFormProps {
  currentStats: HealthStats;
  onSave: (stats: HealthStats) => void;
  onCancel: () => void;
}

const HealthStatsForm: React.FC<HealthStatsFormProps> = ({ currentStats, onSave, onCancel }) => {
  const [stats, setStats] = useState(currentStats);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(stats);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="border-b p-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-semibold flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Health Statistics
          </h2>
          <Button size="sm" onClick={handleSubmit}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
              <Input
                type="number"
                value={stats.height}
                onChange={(e) => setStats(prev => ({ ...prev, height: e.target.value }))}
                placeholder="170"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <Input
                type="number"
                value={stats.weight}
                onChange={(e) => setStats(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="65"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
            <Input
              value={stats.bloodPressure}
              onChange={(e) => setStats(prev => ({ ...prev, bloodPressure: e.target.value }))}
              placeholder="120/80 mmHg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Sugar Level</label>
            <Input
              value={stats.sugarLevel}
              onChange={(e) => setStats(prev => ({ ...prev, sugarLevel: e.target.value }))}
              placeholder="90 mg/dL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate (BPM)</label>
            <Input
              type="number"
              value={stats.heartRate}
              onChange={(e) => setStats(prev => ({ ...prev, heartRate: e.target.value }))}
              placeholder="72"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
            <select
              value={stats.bloodType}
              onChange={(e) => setStats(prev => ({ ...prev, bloodType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthStatsForm;
