'use client';

import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import { Post } from '@/types';
import { List, Plus, Calendar, LogOut } from 'lucide-react';

import { useRouter } from 'next/navigation';
import CalendarView from '@/components/CalendarView';

export default function DashboardPage() {

  const router = useRouter();
  const { data: session, status } = useSession();

  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');


  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPosts();
    }
  }, [status]);

  useEffect(() => {
    filterPosts();
  }, [posts, selectedPlatform, selectedStatus]);



  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingPost(null);

  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      if (data.data) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    if (selectedPlatform) {
      filtered = filtered.filter((post) => post.platform === selectedPlatform);
    }

    if (selectedStatus) {
      filtered = filtered.filter((post) => post.status === selectedStatus);
    }

    setFilteredPosts(filtered);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(posts.map((post) => (post.id === id ? data.data : post)));
      }
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDuplicate = async (post: Post) => {
    try {
      const originalDate = new Date(post.scheduledAt);
      const now = new Date();
      // Ensure duplicated post is scheduled in the future to satisfy API validation
      const scheduledAtDate = originalDate > now ? originalDate : new Date(now.getTime() + 60 * 60 * 1000);

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${post.title} (Copy)`,
          content: post.content,
          platform: post.platform,
          scheduledAt: scheduledAtDate.toISOString(),
          color: post.color,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPosts([...posts, data.data]);
      }
    } catch (error) {
      console.error('Error duplicating post:', error);
    }
  };

  const handleEventDrop = async (id: string, newDate: Date) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheduledAt: newDate.toISOString() }),
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(posts.map((post) => (post.id === id ? data.data : post)));
      }
    } catch (error) {
      console.error('Error updating post date:', error);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="max-w-3xl mx-auto">
          <PostForm
            post={undefined}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Post Scheduler</h1>
              <p className="text-gray-600 mt-1">
                Welcome {session?.user?.name || session?.user?.email}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            <Plus className="w-5 h-5" />
            Create Post
          </button>

          <div className="flex gap-2 bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${view === 'list'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <List className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setView('calendar')}
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
        {/* content */}

        {
          view === 'list' ? (
            <PostList
              posts={filteredPosts}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onDuplicate={handleDuplicate}
            />) : (
            <CalendarView
              posts={filteredPosts}
              onEventClick={handleEdit}
              onEventDrop={handleEventDrop}
            />
          )
        }
      </div>
    </div>
  );
}