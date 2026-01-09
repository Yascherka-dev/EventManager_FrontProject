const Loader = ({ label = 'Chargement...' }: { label?: string }) => {
  return <p className="muted">{label}</p>;
};

export default Loader;

