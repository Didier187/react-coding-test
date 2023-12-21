export default function Arrow({ direction }: { direction: "down" | "up" }) {
  if (direction === "down")
    return <span className="material-symbols-outlined">arrow_downward</span>;
  return <span className="material-symbols-outlined">arrow_upward</span>;
}
