import { SajuInputForm } from "@/components/saju-input-form";

export default function InputPage() {
  return (
    <>
      <section className="status-panel">
        <span className="eyebrow">Input</span>
        <h1 className="page-title">Build the first trust signal before payment.</h1>
        <p className="page-subtitle">
          This screen mirrors the documented onboarding flow: collect birth details, generate a one-paragraph
          preview, then move the user into fixed-price payment.
        </p>
      </section>
      <SajuInputForm />
    </>
  );
}

