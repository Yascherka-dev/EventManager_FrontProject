import { useState } from 'react';
import type { Event, EventStatus } from '../types';

export const useEventFilters = (events: Event[]) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<EventStatus | 'all'>('all');

  let filtered = events;
  if (search) {
    filtered = filtered.filter((evt) =>
      evt.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (status !== 'all') {
    filtered = filtered.filter((evt) => evt.status === status);
  }

  return { search, status, setSearch, setStatus, filtered };
};

