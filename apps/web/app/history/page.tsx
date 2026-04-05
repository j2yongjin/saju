import { HistoryPanel } from "@/components/history-panel";

export default function HistoryPage() {
  return (
    <>
      <section className="status-panel">
        <span className="eyebrow">History</span>
        <h1 className="page-title">Saved reports should scan quickly on mobile.</h1>
        <p className="page-subtitle">
          Users need a compact archive of purchased readings, not an endless feed. This page is the
          placeholder for stored report history.
        </p>
      </section>
      <HistoryPanel />
    </>
  );
}
