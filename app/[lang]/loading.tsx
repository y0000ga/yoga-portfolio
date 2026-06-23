export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-T50/75 backdrop-blur-sm">
      <div
        className="border-primary-T30 border-t-primary-T10 h-12 w-12 animate-spin rounded-full border-4"
        aria-label="Loading"
        role="status"
      />
    </div>
  );
}
