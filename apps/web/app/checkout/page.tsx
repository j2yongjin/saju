import { CheckoutPanel } from "@/components/checkout-panel";

export default function CheckoutPage() {
  return (
    <>
      <section className="status-panel">
        <span className="eyebrow">Checkout</span>
        <h1 className="page-title">One-time pricing, no ambiguous subscription wall.</h1>
        <p className="page-subtitle">
          Toss Payments simple payment is the intended payment path. The current implementation fixes
          the API contract first so the real provider integration can replace it without rewriting the UI flow.
        </p>
      </section>
      <CheckoutPanel />
    </>
  );
}

