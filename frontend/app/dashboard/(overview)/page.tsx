import DashboardClient from "../_components/dashboard-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getNews() {
  const res = await fetch(`${API_URL}/api/news`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

async function getTopMovers() {
  const res = await fetch(`${API_URL}/api/news/topmovers-latest`);
  if (!res.ok) throw new Error("Failed to fetch top movers");
  return res.json();
}

export default async function DashboardPage() {
  const news = await getNews();
  const topMovers = await getTopMovers();

  return <DashboardClient news={news} topMovers={topMovers} />;
}
