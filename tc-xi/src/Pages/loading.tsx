export default function Loading () {
    return (
      <div className="w-[100vw] flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="max-sm:hidden w-[10vw] bg-gray-600 p-4 text-white">
          <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
          <ul className="space-y-3">
            <li className="bg-gray-700 h-10 rounded-lg animate-pulse"></li>
            <li className="bg-gray-700 h-10 rounded-lg animate-pulse"></li>
            <li className="bg-gray-700 h-10 rounded-lg animate-pulse"></li>
          </ul>
        </aside>
  
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">Header</h1>
            <div className="bg-gray-700 w-32 h-8 rounded-lg animate-pulse"></div>
          </header>
  
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
      </div>
    );
  };
  
  