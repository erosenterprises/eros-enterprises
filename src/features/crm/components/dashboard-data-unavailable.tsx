import { AlertTriangle } from "lucide-react";

type DashboardDataUnavailableProps = {
  title?: string;
  message?: string;
};

const defaultMessage =
  "This area is temporarily unavailable because the database is not fully ready. Verify PostgreSQL, run the pending Prisma migration, and then refresh the page.";

export function DashboardDataUnavailable({
  title = "Database setup required",
  message = defaultMessage,
}: DashboardDataUnavailableProps) {
  return (
    <div className="rounded-[2rem] border border-amber-300/25 bg-amber-200/[0.06] p-8 text-white">
      <div className="flex items-start gap-4">
        <div className="rounded-full border border-amber-300/20 bg-amber-200/10 p-3 text-amber-200">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="space-y-3">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
            {title}
          </div>
          <p className="max-w-3xl text-sm leading-7 text-zinc-200/90">{message}</p>
        </div>
      </div>
    </div>
  );
}
