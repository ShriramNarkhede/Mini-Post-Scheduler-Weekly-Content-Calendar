import Link from 'next/link';
import { Calendar, CheckCircle, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Schedule Your Posts
            <span className="block text-blue-600 mt-2">Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage all your social media content in one place. Plan, schedule,
            and track your posts across multiple platforms with ease.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/auth/login"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border-2 border-gray-200"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Visual Calendar
            </h3>
            <p className="text-gray-600">
              See all your scheduled posts in a beautiful weekly calendar view.
              Drag and drop to reschedule instantly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Track Status
            </h3>
            <p className="text-gray-600">
              Mark posts as scheduled, posted, or draft. Keep track of all your
              content with clear status indicators.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Multi-Platform
            </h3>
            <p className="text-gray-600">
              Schedule posts for Twitter, LinkedIn, Facebook, Instagram, and
              more. Manage everything from one dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}