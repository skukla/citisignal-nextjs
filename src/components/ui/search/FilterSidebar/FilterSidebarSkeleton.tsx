export default function FilterSidebarSkeleton() {
  return (
    <>
      {/* Desktop skeleton */}
      <div className="hidden lg:block w-72 space-y-6 animate-pulse">
        {/* Header skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        
        {/* Filter sections skeleton */}
        {[1, 2, 3].map((index) => (
          <div key={index} className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-24"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="ml-auto h-4 bg-gray-200 rounded w-8"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile skeleton - hidden by default */}
      <div className="lg:hidden"></div>
    </>
  );
}