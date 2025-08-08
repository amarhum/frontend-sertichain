export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-700 mb-4"></div>
        <p className="text-lg font-semibold text-blue-700">Loading...</p>
      </div>
    </div>
  );
}