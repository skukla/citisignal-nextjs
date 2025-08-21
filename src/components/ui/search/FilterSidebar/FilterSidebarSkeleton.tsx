interface FilterSidebarSkeletonProps {
  sections?: Array<{
    key: string;
    optionCount: number;
  }>;
  expandedSections?: Record<string, boolean>;
}

export default function FilterSidebarSkeleton({
  sections,
  expandedSections,
}: FilterSidebarSkeletonProps) {
  // Use provided sections or default to 4 sections with 5 options each
  // This better matches typical facet heights to reduce layout shift
  const skeletonSections = sections || [
    { key: 'section1', optionCount: 5 },
    { key: 'section2', optionCount: 5 },
    { key: 'section3', optionCount: 5 },
    { key: 'section4', optionCount: 4 },
  ];

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
        {skeletonSections.map((section) => (
          <div key={section.key} className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-24"></div>
            {/* Only show options if section is expanded or no expansion state provided */}
            {(!expandedSections || expandedSections[section.key] !== false) && (
              <div className="space-y-2">
                {Array.from({ length: section.optionCount }, (_, i) => i).map((optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="ml-auto h-4 bg-gray-200 rounded w-8"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile skeleton - hidden by default */}
      <div className="lg:hidden"></div>
    </>
  );
}
