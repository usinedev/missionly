import { useMemo } from "react";

function MissionStatusChart({ data }) {

    const total = data.reduce((sum, d) => sum + d.value, 0);
    const gradient = useMemo(() => {
        let start = 0;

        return data
        .map((d) => {
            const angle = (d.value / total) * 360;
            const segment = `${d.color} ${start}deg ${start + angle}deg`;
            start += angle;
            return segment;
        })
        .join(",");
    }, [data, total]);

  return (
    <div className="missions-chart">
      <div
        className="donut"
        style={{
          background: `conic-gradient(${gradient})`
        }}
      />

      <ul className="legend">
        {data.map((d) => (
          <li key={d.label}>
            <span
              className="legend-color"
              style={{ background: d.color }}
            ></span>
            {d.value} {d.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MissionStatusChart;