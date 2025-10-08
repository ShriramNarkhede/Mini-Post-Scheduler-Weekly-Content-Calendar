export interface Post {
    id: string;
    title: string;
    content: string;
    platform: string;
    scheduledAt: Date | string;
    status: 'scheduled' | 'posted' | 'draft';
    color?: string;
    userId: string;
    createdAt: Date | string;
    updatedAt: Date | string;
  }
  
  export interface CreatePostInput {
    title: string;
    content: string;
    platform: string;
    scheduledAt: Date | string;
    color?: string;
  }
  
  export interface UpdatePostInput extends Partial<CreatePostInput> {
    id: string;
    status?: 'scheduled' | 'posted' | 'draft';
  }
  
  export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
  }
  
  export const PLATFORMS = [
    'Twitter',
    'LinkedIn',
    'Facebook',
    'Instagram',
    'Blog',
  ] as const;
  
  export const POST_COLORS = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#ec4899', // pink
  ] as const;