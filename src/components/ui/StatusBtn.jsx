function FilterBtn({ selectedCategory, onChange }) {
    const categories = [
    { key: "all", label: "Toutes" },
    { key: "created", label: "Créées" },
    { key: "published", label: "Publiées" },
    { key: "started", label: "En cours" },
    { key: "finished", label: "Terminées" },
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