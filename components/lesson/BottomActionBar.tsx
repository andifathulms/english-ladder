export function BottomActionBar({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="sticky bottom-0 z-10 border-t border-rule bg-surface"
      style={{ paddingBottom: 'max(var(--s-3), env(safe-area-inset-bottom))' }}
    >
      <div className="page flex max-w-lesson items-center justify-center gap-3 pt-3">{children}</div>
    </div>
  );
}
