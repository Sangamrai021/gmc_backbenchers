const STATUS_ORDER = ['received', 'in_progress', 'resolved'];

export default function ProgressSteps({ currentStatus, events }) {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-0">
        {STATUS_ORDER.map((status, i) => {
          const isComplete = currentIndex >= i;
          const isCurrent = currentIndex === i;
          return (
            <div key={status} className="flex-1 flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isComplete ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'
              } ${isCurrent ? 'ring-4 ring-indigo-100' : ''}`}>
                {isComplete ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`text-[10px] font-medium ml-1 ${
                isComplete ? 'text-indigo-600' : 'text-gray-400'
              }`}>
                {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
              </span>
              {i < STATUS_ORDER.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${isComplete && i < currentIndex ? 'bg-indigo-600' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      {events && events.length > 0 && (
        <div className="mt-4 space-y-2">
          {events.map((event, i) => (
            <div key={event.id || i} className="flex items-start gap-2 text-xs">
              <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-indigo-400 shrink-0" />
              <div>
                <p className="text-gray-700">{event.description}</p>
                <p className="text-gray-400 text-[10px]">{event.bs_created_at || new Date(event.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}