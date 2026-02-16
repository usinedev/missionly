function FilterBtn({ selectedCategory, onChange }) {
  const categories = [
    { key: "all", label: "Toutes" },
    { key: "dev", label: "Développement & Tech" },
    { key: "design", label: "Design & Création" },
    { key: "product", label: "Produit & UX" },
    { key: "marketing", label: "Marketing & Communication" },
    { key: "data", label: "Data & Analyse" },
    { key: "support", label: "Support & Coordination" },
  ];

  return (
    <div className="filters">
      {categories.map((cat) => (
        <button
          key={cat.key}
          type="button"
          className={`${selectedCategory === cat.key ? "active" : ""} filterBtn`}
          onClick={() => onChange(cat.key)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}


export default FilterBtn