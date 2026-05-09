import axios from "axios";

const api = axios.create({
  baseURL: "https://coffeedate.vandana.cloud/api/v1/promo",
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor – unwrap data & normalize errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject(
        new Error("Request timed out. Check your connection and try again.")
      );
    }
    if (!error.response) {
      return Promise.reject(
        new Error(
          "No internet connection. Please check your network and try again."
        )
      );
    }
    const data = error.response.data;
    const msg =
      data?.detail || data?.message || data?.error || `Server error (${error.response.status})`;
    const err = new Error(msg);
    err.status = error.response.status;
    err.data = data;
    return Promise.reject(err);
  }
);

export async function submitPromo({ name, email, company, phone_number, referred_by }) {
  const body = { name, email, company, phone_number };
  if (referred_by) body.referred_by = referred_by;
  return api.post("/add", body);
}

export async function listPromo({ page, page_size } = {}) {
  const params = {};
  if (page !== undefined) params.page = page;
  if (page_size !== undefined) params.page_size = page_size;
  return api.get("/list", { params });
}

export async function getCount() {
  return api.get("/count");
}

