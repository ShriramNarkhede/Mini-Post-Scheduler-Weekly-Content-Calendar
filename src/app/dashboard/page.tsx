'use client';

import { List, Plus, Calendar, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {

    const [view, setView] = useState<'list' | 'calendar'>('list');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">

            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Post Scheduler</h1>
                            <p className="text-gray-600 mt-1">
                                Welcome User Name,
                            </p>
                        </div>
                        <button
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
                {/* Controls */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <button

                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
                    >
                        <Plus className="w-5 h-5" />
                        Create Post
                    </button>

                    <div className="flex gap-2 bg-white rounded-lg shadow-md p-1">
                        <button

                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${view === 'list'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <List className="w-4 h-4" />
                            List
                        </button>
                        <button

                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${view === 'calendar'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <Calendar className="w-4 h-4" />
                            Calendar
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}