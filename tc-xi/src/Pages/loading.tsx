export default function Loading() {
  return (
    <div className="w-[100vw] flex h-screen ">
    

        {/* Content Grid */}
        <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-4 rounded-lg space-y-4 animate-pulse"
            >
              <div className="h-40 bg-gray-300 rounded"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </main>
      
    </div>
  );
}
