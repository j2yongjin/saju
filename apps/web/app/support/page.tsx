import { InquiryForm } from "@/components/inquiry-form";

export default function SupportPage() {
  return (
    <>
      <section className="status-panel">
        <span className="eyebrow">Support</span>
        <h1 className="page-title">Inquiry handling belongs to the first admin scope.</h1>
        <p className="page-subtitle">
          The support flow starts as a simple board so payment failures and report issues can be resolved
          without leaking sensitive birth data into logs or screenshots.
        </p>
      </section>
      <InquiryForm />
    </>
  );
}

