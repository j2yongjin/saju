import Link from "next/link";

import { fetchReportHistory, type ReportListItem } from "@/lib/api";

async function getHistory(): Promise<ReportListItem[]> {
  try {
    return await fetchReportHistory();
  } catch {
    return [];
  }
}

export async function HistoryPanel() {
  const items = await getHistory();

  if (items.length === 0) {
    return (
      <section className="history-card">
        <h3>No stored reports yet</h3>
        <p className="muted">
          Generate a preview first. Once persisted, reports will appear here for the demo user.
        </p>
      </section>
    );
  }

  return (
    <section className="history-list">
      {items.map((item) => (
        <article key={item.report_id} className="history-card">
          <h3>{item.title}</h3>
          <p className="muted">
            {item.report_type} created at {new Date(item.created_at).toLocaleString()}
          </p>
          <div className="tag-row">
            <span className="tag">{item.report_id}</span>
            <Link className="button-secondary" href={`/result/${item.report_id}`}>
              Open result
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}

