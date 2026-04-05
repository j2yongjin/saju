"use client";

import { useState, useTransition } from "react";
import { createCheckoutSession, type CheckoutResponse } from "@/lib/api";

const products = [
  {
    code: "basic_saju" as const,
    title: "Basic saju",
    price: 12900,
    description: "Full chart reading with personality, career, wealth, and major cycle categories.",
  },
  {
    code: "compatibility_bundle" as const,
    title: "Compatibility bundle",
    price: 18900,
    description: "Pair reading for romance dynamics, friction points, and shared timing patterns.",
  },
];

export function CheckoutPanel() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [session, setSession] = useState<CheckoutResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleCheckout() {
    setError(null);

    try {
      const nextSession = await createCheckoutSession({
        product_code: selectedProduct.code,
        amount: selectedProduct.price,
      });

      startTransition(() => {
        setSession(nextSession);
      });
    } catch (nextError) {
      setSession(null);
      setError(nextError instanceof Error ? nextError.message : "Checkout session creation failed.");
    }
  }

  return (
    <div className="result-columns">
      <section className="section-card accent">
        <span className="eyebrow">Step 3</span>
        <h2>Choose a payment path</h2>
        <p className="section-copy">
          MVP uses simple payment only. The actual Toss Payments integration is still a backend task,
          but the checkout contract is already fixed here.
        </p>
        <div className="locked-grid">
          {products.map((product) => (
            <button
              key={product.code}
              className="section-card"
              style={{
                textAlign: "left",
                background:
                  product.code === selectedProduct.code
                    ? "linear-gradient(135deg, rgba(171, 138, 59, 0.16), rgba(255, 250, 240, 0.88))"
                    : undefined,
              }}
              type="button"
              onClick={() => setSelectedProduct(product)}
            >
              <h3>{product.title}</h3>
              <p className="section-copy">{product.description}</p>
              <div className="tag-row">
                <span className="tag">KRW {product.price.toLocaleString()}</span>
                <span className="tag">One-time fixed price</span>
              </div>
            </button>
          ))}
        </div>
        <div className="form-actions">
          <button className="button-primary" disabled={isPending} type="button" onClick={handleCheckout}>
            {isPending ? "Preparing..." : "Create checkout session"}
          </button>
        </div>
        {error ? <div className="feedback error">{error}</div> : null}
      </section>

      <section className="status-panel">
        <span className="eyebrow">Contract</span>
        <h2>Current checkout behavior</h2>
        <p className="section-copy">
          If the full report fails after payment confirmation, the documented fallback is refund.
        </p>

        {session ? (
          <div className="feedback">
            <strong>{session.status}</strong>
            <p className="muted">Provider: {session.provider}</p>
            <p className="muted">Checkout ID: {session.checkout_id}</p>
            <p className="muted">Purchase ID: {session.purchase_id}</p>
            <p className="muted">Mock URL: {session.checkout_url}</p>
          </div>
        ) : (
          <div className="feedback">
            <strong>No checkout session yet</strong>
            <p className="muted">Select a product and generate a mock checkout session.</p>
          </div>
        )}
      </section>
    </div>
  );
}
