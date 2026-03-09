function StatusBtn({ selectedStatus, onChange }) {
    const status = [
        { key: "all", label: "Toutes" },
        { key: "created", label: "Brouillon" },
        { key: "published", label: "Ouverte" },
        { key: "started", label: "En cours" },
        { key: "finished", label: "Terminée" },
    ];

  return (
    <div className="filters">
      {status.map((stat) => (
        <button
          key={stat.key}
          type="button"
          className={`${selectedStatus === stat.key ? "active" : ""} statusBtn`}
          onClick={() => onChange(stat.key)}
        >
          {stat.label}
        </button>
      ))}
    </div>
  );
}


export default StatusBtn;
