const STATUS_STYLES = {
  received: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
  resolved: 'bg-green-100 text-green-800 border-green-200',
  merged: 'bg-purple-100 text-purple-800 border-purple-200',
};

const PRIORITY_STYLES = {
  low: 'bg-gray-100 text-gray-600 border-gray-200',
  medium: 'bg-blue-100 text-blue-700 border-blue-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  critical: 'bg-red-100 text-red-700 border-red-200',
};

export function StatusBadge({ status }) {
  const label = status?.replace('_', ' ') || 'unknown';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-600'}`}>
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${PRIORITY_STYLES[priority] || 'bg-gray-100 text-gray-600'}`}>
      {priority?.charAt(0).toUpperCase() + priority?.slice(1) || 'Unknown'}
    </span>
  );
}