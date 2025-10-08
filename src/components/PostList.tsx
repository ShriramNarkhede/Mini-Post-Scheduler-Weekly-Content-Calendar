'use client';

import { useState } from 'react';
import { Post } from '@/types';
import { formatDate } from '@/lib/utils';
import { Pencil, Trash2, CheckCircle, Copy } from 'lucide-react';

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  onDuplicate: (post: Post) => void;
}

export default function PostList({
  posts,
  onEdit,
  onDelete,
  onStatusChange,
  onDuplicate,
}: PostListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setDeletingId(id);
      await onDelete(id);
      setDeletingId(null);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-lg">No posts yet. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          style={{ borderLeft: `4px solid ${post.color || '#3b82f6'}` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {post.title}
                </h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    post.status === 'posted'
                      ? 'bg-green-100 text-green-800'
                      : post.status === 'draft'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {post.status}
                </span>
              </div>

              <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="font-medium">{post.platform}</span>
                <span>•</span>
                <span>{formatDate(post.scheduledAt)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              {post.status === 'scheduled' && (
                <button
                  onClick={() => onStatusChange(post.id, 'posted')}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Mark as Posted"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={() => onDuplicate(post)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Duplicate"
              >
                <Copy className="w-5 h-5" />
              </button>

              <button
                onClick={() => onEdit(post)}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                title="Edit"
              >
                <Pencil className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleDelete(post.id)}
                disabled={deletingId === post.id}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}