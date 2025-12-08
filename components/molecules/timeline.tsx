interface TimelineItem {
  id: string | number;
  date?: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items?: TimelineItem[];
  activeStep?: number; // 0-indexed
}

const timelineData = [
  {
    id: 1,
    date: 'January 15, 2024',
    title: 'Phase I',
    description:
      'Initial data collection and model architecture design for the AI system.',
  },
  {
    id: 2,
    date: 'March 30, 2024',
    title: 'Phase II',
    description:
      'Model training and validation with core dataset implementation.',
  },
  {
    id: 3,
    date: 'June 15, 2024',
    title: 'Phase III',
    description:
      'Integration of advanced features and performance optimization.',
  },
  {
    id: 4,
    date: 'September 1, 2024',
    title: 'Phase IV',
    description:
      'Final testing, deployment, and continuous improvement system launch.',
  },
];

export function Timeline({
  items = timelineData,
  activeStep = 1,
}: TimelineProps) {
  return (
    <div className="w-full">
      {/* Timeline Container */}
      <div className="relative">
        {/* Line connecting all items */}
        <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-300" />

        {/* Timeline Items */}
        <div className="flex justify-between items-start relative z-10">
          {items.map((item, index) => {
            const isActive = index === activeStep;

            return (
              <div key={item.id} className="flex flex-col flex-1">
                {/* Circle Marker */}
                <div
                  className={`w-4 h-4 rounded-full border-4 transition-all duration-300 ${
                    isActive
                      ? 'bg-white border-black scale-125'
                      : 'bg-white border-gray-400 hover:border-gray-600'
                  }`}
                />

                {/* Content */}
                <div className="mt-8 pr-6">
                  {/* Date */}
                  {item.date && (
                    <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                  )}

                  {/* Title */}
                  <h3
                    className={`text-lg font-bold  transition-colors ${
                      isActive ? 'text-black' : 'text-gray-700'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs text-balance">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
