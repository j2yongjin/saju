"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/api";

export function InquiryForm() {
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="section-card accent">
      <span className="eyebrow">Support</span>
      <h2>1:1 inquiry board</h2>
      <p className="section-copy">
        The admin scope includes inquiry handling. This form is a UI placeholder until the backend
        support module is connected.
      </p>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setSubmittedMessage(null);
          setError(null);

          const formData = new FormData(event.currentTarget);

          try {
            const response = await submitInquiry({
              category: formData.get("category") as "payment" | "report" | "account",
              title: String(formData.get("title") ?? ""),
              body: String(formData.get("body") ?? ""),
            });
            setSubmittedMessage(`Inquiry ${response.inquiry_id} created with status ${response.status}.`);
          } catch (nextError) {
            setError(nextError instanceof Error ? nextError.message : "Inquiry submission failed.");
          }
        }}
      >
        <div className="form-grid">
          <div className="field">
            <label htmlFor="support-category">Category</label>
            <select id="support-category" name="category" defaultValue="payment">
              <option value="payment">Payment</option>
              <option value="report">Report issue</option>
              <option value="account">Account</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="support-title">Title</label>
            <input
              id="support-title"
              name="title"
              placeholder="Payment confirmed but report missing"
              required
            />
          </div>

          <div className="field-full">
            <label htmlFor="support-body">Message</label>
            <textarea
              id="support-body"
              name="body"
              placeholder="Describe the issue, affected report, and payment timing."
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button className="button-primary" type="submit">
            Submit inquiry
          </button>
        </div>
      </form>

      {submittedMessage ? (
        <div className="feedback">
          <strong>Inquiry submitted</strong>
          <p className="muted">{submittedMessage}</p>
        </div>
      ) : null}
      {error ? <div className="feedback error">{error}</div> : null}
    </section>
  );
}
