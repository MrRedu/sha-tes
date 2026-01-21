import { cn } from '@/lib/utils';

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
      <div className="flex flex-col md:flex-row md:justify-between">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = index <= activeStep;

          return (
            <div
              key={item.id}
              className={`relative flex flex-row md:flex-col ${
                !isLast ? 'flex-1' : 'flex-none md:flex-1'
              }`}
            >
              {/* Connector Line */}
              {/* Vertical Line (Mobile) */}
              <div
                className={cn(
                  'absolute left-[7px] top-[16px] bottom-0 w-[2px] bg-slate-200 md:hidden',
                  isActive && 'bg-primary',
                )}
              />
              {/* Horizontal Line (Desktop) */}
              <div
                className={cn(
                  'hidden md:block absolute left-[16px] right-0 top-[7px] h-[2px] bg-slate-200',
                  isActive && 'bg-primary',
                )}
              />

              {/* Dot & Content Wrapper */}
              <div className="flex flex-row md:flex-col items-start w-full">
                {/* Circle Marker */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 bg-white relative z-10 ${
                      isActive ? 'border-black' : 'border-slate-300'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="ml-6 md:ml-0 md:mt-8 pb-10 md:pb-0 md:pr-10">
                  {/* Date */}
                  {item.date && (
                    <p className="text-sm font-medium text-slate-400 mb-1">
                      {item.date}
                    </p>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed text-balance max-w-xs transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
