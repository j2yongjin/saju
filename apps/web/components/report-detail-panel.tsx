import { fetchReportDetail, type ReportDetailResponse } from "@/lib/api";

async function getReport(reportId: string): Promise<ReportDetailResponse | null> {
  try {
    return await fetchReportDetail(reportId);
  } catch {
    return null;
  }
}

type ReportDetailPanelProps = Readonly<{
  reportId: string;
}>;

export async function ReportDetailPanel({ reportId }: ReportDetailPanelProps) {
  const report = await getReport(reportId);

  if (!report) {
    return (
      <section className="result-section">
        <h2>Report unavailable</h2>
        <p className="muted">
          The API did not return a persisted report for this id yet. Generate a preview first.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="status-panel accent">
        <span className="eyebrow">Persisted report</span>
        <h1 className="page-title">{report.report_id}</h1>
        <p className="page-subtitle">{report.preview_summary}</p>
        <div className="tag-row">
          <span className="tag">{report.report_type}</span>
          <span className="tag">{report.status}</span>
        </div>
      </section>

      <section className="result-columns">
        {report.sections.map((section) => (
          <article key={section.title} className="result-section">
            <h2>{section.title}</h2>
            <p className="muted">{section.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}

