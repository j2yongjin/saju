"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { fetchPreview, type PreviewResponse, type ReportType } from "@/lib/api";

type FormState = {
  reportType: ReportType;
  birthDate: string;
  birthTime: string;
  calendarMode: "solar" | "lunar";
  gender: "male" | "female" | "other";
  partnerBirthDate: string;
  partnerBirthTime: string;
  partnerCalendarMode: "solar" | "lunar";
  partnerGender: "male" | "female" | "other";
};

const initialState: FormState = {
  reportType: "basic_saju",
  birthDate: "",
  birthTime: "",
  calendarMode: "solar",
  gender: "female",
  partnerBirthDate: "",
  partnerBirthTime: "",
  partnerCalendarMode: "solar",
  partnerGender: "male",
};

export function SajuInputForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [preview, setPreview] = useState<PreviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (form.reportType === "compatibility" && (!form.partnerBirthDate || !form.partnerBirthTime)) {
      setError("Compatibility preview requires the partner's birth date and birth time.");
      return;
    }

    try {
      const nextPreview = await fetchPreview({
        report_type: form.reportType,
        primary_profile: {
          birth_date: form.birthDate,
          birth_time: form.birthTime,
          calendar_mode: form.calendarMode,
          gender: form.gender,
        },
        partner_profile:
          form.reportType === "compatibility"
            ? {
                birth_date: form.partnerBirthDate,
                birth_time: form.partnerBirthTime,
                calendar_mode: form.partnerCalendarMode,
                gender: form.partnerGender,
              }
            : undefined,
      });

      startTransition(() => {
        setPreview(nextPreview);
      });
    } catch (nextError) {
      setPreview(null);
      setError(nextError instanceof Error ? nextError.message : "Preview generation failed.");
    }
  }

  return (
    <div className="result-columns">
      <section className="section-card accent">
        <span className="eyebrow">Step 1</span>
        <h2>Enter birth details</h2>
        <p className="section-copy">
          The first preview stays short on purpose. It should confirm trust before payment,
          then the full report opens category-level reading.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="reportType">Report type</label>
              <select
                id="reportType"
                value={form.reportType}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    reportType: event.target.value as ReportType,
                  }))
                }
              >
                <option value="basic_saju">Basic saju</option>
                <option value="compatibility">Compatibility</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="calendarMode">Calendar mode</label>
              <select
                id="calendarMode"
                value={form.calendarMode}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    calendarMode: event.target.value as FormState["calendarMode"],
                  }))
                }
              >
                <option value="solar">Solar</option>
                <option value="lunar">Lunar</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="birthDate">Birth date</label>
              <input
                id="birthDate"
                required
                type="date"
                value={form.birthDate}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    birthDate: event.target.value,
                  }))
                }
              />
            </div>

            <div className="field">
              <label htmlFor="birthTime">Birth time</label>
              <input
                id="birthTime"
                required
                type="time"
                value={form.birthTime}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    birthTime: event.target.value,
                  }))
                }
              />
            </div>

            <div className="field">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={form.gender}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    gender: event.target.value as FormState["gender"],
                  }))
                }
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>

            {form.reportType === "compatibility" ? (
              <>
                <div className="field">
                  <label htmlFor="partnerCalendarMode">Partner calendar mode</label>
                  <select
                    id="partnerCalendarMode"
                    value={form.partnerCalendarMode}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        partnerCalendarMode: event.target.value as FormState["partnerCalendarMode"],
                      }))
                    }
                  >
                    <option value="solar">Solar</option>
                    <option value="lunar">Lunar</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="partnerGender">Partner gender</label>
                  <select
                    id="partnerGender"
                    value={form.partnerGender}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        partnerGender: event.target.value as FormState["partnerGender"],
                      }))
                    }
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="partnerBirthDate">Partner birth date</label>
                  <input
                    id="partnerBirthDate"
                    type="date"
                    value={form.partnerBirthDate}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        partnerBirthDate: event.target.value,
                      }))
                    }
                  />
                </div>

                <div className="field">
                  <label htmlFor="partnerBirthTime">Partner birth time</label>
                  <input
                    id="partnerBirthTime"
                    type="time"
                    value={form.partnerBirthTime}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        partnerBirthTime: event.target.value,
                      }))
                    }
                  />
                </div>
              </>
            ) : null}
          </div>

          <div className="form-actions">
            <button className="button-primary" disabled={isPending} type="submit">
              {isPending ? "Generating preview..." : "Generate preview"}
            </button>
            <Link className="button-secondary" href="/checkout">
              Skip to payment options
            </Link>
          </div>
        </form>

        {error ? <div className="feedback error">{error}</div> : null}
      </section>

      <section className="status-panel">
        <span className="eyebrow">Step 2</span>
        <h2>Preview and paywall</h2>
        <p className="section-copy">
          One short paragraph is visible before payment. Everything after that remains locked.
        </p>

        {preview ? (
          <>
            <div className="feedback">
              <strong>Preview summary</strong>
              <p className="muted">{preview.preview_summary}</p>
              {preview.report_id ? (
                <p className="muted">
                  Stored as report <strong>{preview.report_id}</strong>
                </p>
              ) : null}
            </div>
            <div className="mini-divider" />
            <div className="locked-grid">
              {preview.locked_categories.map((category) => (
                <article key={category} className="locked-card">
                  <h3>{category}</h3>
                  <p className="muted">
                    Full reading opens after fixed-price payment or bundle purchase.
                  </p>
                </article>
              ))}
            </div>
            <div className="tag-row">
              {preview.recommended_products.map((product) => (
                <span key={product} className="tag">
                  {product}
                </span>
              ))}
              {preview.report_id ? (
                <Link className="button-secondary" href={`/result/${preview.report_id}`}>
                  Open stored result
                </Link>
              ) : null}
            </div>
          </>
        ) : (
          <div className="feedback">
            <strong>No preview yet</strong>
            <p className="muted">
              Submit the form to validate the input contract and see the free summary paragraph.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
