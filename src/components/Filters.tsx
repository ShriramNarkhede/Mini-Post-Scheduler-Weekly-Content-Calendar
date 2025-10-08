'use client';

import { PLATFORMS } from '@/types';

interface FiltersProps {
  selectedPlatform: string;
  selectedStatus: string;
  onPlatformChange: (platform: string) => void;
  onStatusChange: (status: string) => void;
}

export default function Filters({
  selectedPlatform,
  selectedStatus,
  onPlatformChange,
  onStatusChange,
}: FiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-wrap gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Platform
        </label>
        <select
          value={selectedPlatform}
          onChange={(e) => onPlatformChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Platforms</option>
          {PLATFORMS.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="scheduled">Scheduled</option>
          <option value="posted">Posted</option>
          <option value="draft">Draft</option>
        </select>
      </div>
    </div>
  );
}