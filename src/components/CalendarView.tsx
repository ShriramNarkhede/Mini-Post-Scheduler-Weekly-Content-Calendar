'use client';

import { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Post } from '@/types';

interface CalendarViewProps {
  posts: Post[];
  onEventClick: (post: Post) => void;
  onEventDrop: (id: string, newDate: Date) => void;
}

export default function CalendarView({
  posts,
  onEventClick,
  onEventDrop,
}: CalendarViewProps) {
  const calendarRef = useRef<FullCalendar>(null);

  const events = posts.map((post) => ({
    id: post.id,
    title: post.title,
    start: new Date(post.scheduledAt),
    backgroundColor: post.color || '#3b82f6',
    borderColor: post.color || '#3b82f6',
    extendedProps: {
      post,
    },
  }));

  const handleEventClick = (info: any) => {
    onEventClick(info.event.extendedProps.post);
  };

  const handleEventDrop = (info: any) => {
    onEventDrop(info.event.id, info.event.start);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridWeek,dayGridMonth',
        }}
        events={events}
        editable={true}
        droppable={true}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        height="auto"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
        }}
      />
    </div>
  );
}