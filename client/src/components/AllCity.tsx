import { Link } from "react-router-dom";

const cities = [
  { name: "Alessandria" },
  { name: "Ancona" },
  { name: "Bari" },
  { name: "Bolonia" },
  { name: "Brescia" },
  { name: "Bérgamo" },
  { name: "Cagliari" },
  { name: "Catania" },
  { name: "Cesena" },
  { name: "Ferrara" },
  { name: "Florencia" },
  { name: "Foggia" },
  { name: "Forlì" },
  { name: "Génova", bold: true },
  { name: "La Spezia" },
  { name: "Livorno" },
  { name: "Messina" },
  { name: "Milán", bold: true },
  { name: "Módena" },
  { name: "Nápoles" },
  { name: "Padua" },
  { name: "Palermo", bold: true },
  { name: "Parma" },
  { name: "Perugia" },
  { name: "Pesaro" },
  { name: "Pescara" },
  { name: "Piacenza" },
  { name: "Pisa" },
  { name: "Reggio Calabria" },
  { name: "Reggio Emilia" },
  { name: "Rimini" },
  { name: "Roma", bold: true },
  { name: "Rávena" },
  { name: "Salerno" },
  { name: "Taranto" },
  { name: "Trento" },
  { name: "Trieste" },
  { name: "Turín", bold: true },
  { name: "Venecia" },
  { name: "Verbania" },
  { name: "Verona" },
];

export default function AllCity() {
  return (
    <div style={{ background: "#fafbfc", padding: 16, borderRadius: 4 }}>
      {cities.map((city, idx) => (
        <Link
          key={city.name}
          to={`/city/${encodeURIComponent(city.name)}`}
          style={{
            color: "#1a73e8",
            fontWeight: city.bold ? "bold" : "normal",
            textDecoration: "none",
            marginRight: 12,
            marginBottom: 8,
            display: "inline-block",
          }}
        >
          {city.name}
        </Link>
      ))}
    </div>
  );
}
