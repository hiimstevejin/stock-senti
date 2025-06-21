import { DashboardHeader } from "./_components/dashboard-header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <DashboardHeader />
        {children}
    </div>
  );
}
