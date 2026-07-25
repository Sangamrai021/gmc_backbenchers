import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';

export default function SpamLogs({ logs }) {
  return (
    <SuperAdminLayout activeItem="Spam Logs">
      <Head title="Spam Logs" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Spam Logs</h1>

        <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Event</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">UUID</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Score</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.data.map(log => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-900">{log.event_type}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 font-mono">{log.uuid || '—'}</td>
                  <td className="px-4 py-3">
                    {log.spam_score !== null ? (
                      <span className={`text-xs font-medium ${log.spam_score > 0.7 ? 'text-red-600' : 'text-orange-600'}`}>
                        {log.spam_score.toFixed(2)}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{new Date(log.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SuperAdminLayout>
  );
}