import { LogOut } from 'lucide-react';

export default function DashboardPage() {
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
            </div>
        </div>
    );
}