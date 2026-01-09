import { useState } from 'react';

interface ParticipantFormProps {
  onSubmit: (payload: { name: string; email: string }) => Promise<void>;
}

const ParticipantForm = ({ onSubmit }: ParticipantFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Champs manquants');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await onSubmit({ name, email });
      setName('');
      setEmail('');
    } catch (err: any) {
      setError('Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="participant-name">Nom</label>
        <input
          id="participant-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="participant-email">Email</label>
        <input
          id="participant-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button className="button" type="submit" disabled={loading}>
        {loading ? 'Ajout...' : 'Inscrire'}
      </button>
    </form>
  );
};

export default ParticipantForm;

