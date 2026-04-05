import { ReportDetailPanel } from "@/components/report-detail-panel";

export default function ResultPage({ params }: ResultPageProps) {
  return (
    <ReportDetailPanel reportId={params.reportId} />
  );
}

type ResultPageProps = {
  params: {
    reportId: string;
  };
};
