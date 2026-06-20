import { cn } from "@/lib/utils";

type LoadingViewProps = {
  title?: string;
  compact?: boolean;
};

export function LoadingView({
  title = "Cargando Articulos Meza",
  compact = false,
}: LoadingViewProps) {
  return (
    <main
      className={cn(
        "soft-grid-bg grid min-h-screen place-items-center bg-stone-50 px-4",
        compact && "min-h-[70vh]",
      )}
    >
      <section className="w-full max-w-md rounded-lg border border-white bg-white p-5 shadow-xl shadow-slate-950/10">
        <div className="flex items-center gap-3">
          <span className="motion-pulse-ring h-12 w-12 rounded-md bg-slate-950" />
          <div className="min-w-0">
            <p className="text-sm font-black uppercase tracking-wide text-teal-700">
              {title}
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              Preparando una vista limpia para tu dispositivo.
            </p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          <div className="h-3 w-4/5 rounded-full bg-slate-100" />
          <div className="h-3 w-full rounded-full bg-slate-100" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-16 rounded-md bg-stone-100" />
            <div className="h-16 rounded-md bg-stone-100" />
            <div className="h-16 rounded-md bg-stone-100" />
          </div>
        </div>
      </section>
    </main>
  );
}
