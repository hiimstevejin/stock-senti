import DashboardClient from "../_components/dashboard-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getNews() {
  const res = await fetch(`${API_URL}/api/news`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export default async function DashboardPage() {
  const news = await getNews();

  return <DashboardClient news={news} />;
}
