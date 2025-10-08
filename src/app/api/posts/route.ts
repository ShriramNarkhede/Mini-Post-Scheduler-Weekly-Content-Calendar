import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// GET all posts for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const status = searchParams.get('status');

    const posts = await prisma.post.findMany({
      where: {
        userId: session.user.id,
        ...(platform && { platform }),
        ...(status && { status }),
      },
      orderBy: {
        scheduledAt: 'asc',
      },
    });

    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST create a new post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, platform, scheduledAt, color } = body;

    // Validation
    if (!title || !content || !platform || !scheduledAt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prevent scheduling in the past
    const scheduledDate = new Date(scheduledAt);
    if (scheduledDate < new Date()) {
      return NextResponse.json(
        { error: 'Cannot schedule posts in the past' },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        platform,
        scheduledAt: scheduledDate,
        color,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}