export type CalendarMode = "solar" | "lunar";
export type Gender = "male" | "female" | "other";
export type ReportType = "basic_saju" | "compatibility";

export type BirthProfileInput = {
  birth_date: string;
  birth_time: string;
  calendar_mode: CalendarMode;
  gender: Gender;
};

export type PreviewRequest = {
  report_type: ReportType;
  primary_profile: BirthProfileInput;
  partner_profile?: BirthProfileInput;
};

export type PreviewResponse = {
  request_id: string;
  report_id?: string | null;
  preview_summary: string;
  locked_categories: string[];
  recommended_products: string[];
};

export type CheckoutRequest = {
  product_code: "basic_saju" | "compatibility_bundle";
  amount: number;
  report_id?: string;
};

export type CheckoutResponse = {
  checkout_id: string;
  purchase_id: string;
  checkout_url: string;
  provider: string;
  status: string;
};

export type ReportListItem = {
  report_id: string;
  report_type: ReportType;
  title: string;
  created_at: string;
};

export type ReportDetailResponse = {
  report_id: string;
  report_type: ReportType;
  preview_summary: string;
  status: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export type InquiryRequest = {
  category: "payment" | "report" | "account";
  title: string;
  body: string;
};

export type InquiryResponse = {
  inquiry_id: string;
  status: string;
  created_at: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Request failed.");
  }

  return (await response.json()) as T;
}

export async function fetchPreview(payload: PreviewRequest): Promise<PreviewResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/reports/preview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse<PreviewResponse>(response);
}

export async function createCheckoutSession(
  payload: CheckoutRequest,
): Promise<CheckoutResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/payments/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse<CheckoutResponse>(response);
}

export async function fetchReportHistory(): Promise<ReportListItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/reports/history`, {
    cache: "no-store",
  });

  return parseResponse<ReportListItem[]>(response);
}

export async function fetchReportDetail(reportId: string): Promise<ReportDetailResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/reports/${reportId}`, {
    cache: "no-store",
  });

  return parseResponse<ReportDetailResponse>(response);
}

export async function submitInquiry(payload: InquiryRequest): Promise<InquiryResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/support/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse<InquiryResponse>(response);
}
