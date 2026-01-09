import { useState } from 'react';
import type { EventStatus } from '../types';

interface EventFormProps {
  initial?: any;
  onSubmit: (values: any) => Promise<void>;
  submitLabel: string;
}

const EventForm = ({ initial, onSubmit, submitLabel }: EventFormProps) => {
  const [title, setTitle] = useState(initial ? initial.title : '');
  const [date, setDate] = useState(initial && initial.date ? initial.date.slice(0, 10) : '');
  const [location, setLocation] = useState(initial ? initial.location : '');
  const [status, setStatus] = useState<EventStatus>(initial && initial.status ? initial.status : 'upcoming');
  const [description, setDescription] = useState(initial ? initial.description : '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !location || !description) {
      setError('Champs manquants');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        title,
        date,
        location,
        status,
        description,
        participants: initial && initial.participants ? initial.participants : [],
      });
    } catch (err: any) {
      setError('Erreur');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Nom de l&apos;événement</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="location">Lieu</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as EventStatus)}
        >
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button className="button" type="submit" disabled={submitting}>
        {submitting ? 'En cours...' : submitLabel}
      </button>
    </form>
  );
};

export default EventForm;

