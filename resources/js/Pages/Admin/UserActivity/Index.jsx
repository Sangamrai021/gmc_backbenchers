import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ activities, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearch(val);
        router.get(
            route('admin.useractivity'),
            { search: val },
            { preserveState: true, replace: true }
        );
    };

    const formatActionName = (action) => {
        if (!action) return 'Unknown Action';
        return action
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold leading-tight text-gray-900">
                            User Activity Logs
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Track the latest activities and events triggered by users
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Admin - User Activity" />

            <div className="space-y-6">
                {/* Filter and Search Bar */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search by user name or email..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>
                </div>

                {/* Paginated Activity Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-3.5">User</th>
                                    <th className="px-6 py-3.5">Action</th>
                                    <th className="px-6 py-3.5">Subject</th>
                                    <th className="px-6 py-3.5">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-sm">
                                {activities.data.length > 0 ? (
                                    activities.data.map((activity) => (
                                        <tr key={activity.id} className="hover:bg-gray-50/80 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-semibold text-xs flex items-center justify-center shrink-0">
                                                        {activity.student?.name ? activity.student.name.charAt(0).toUpperCase() : 'U'}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{activity.student?.name || 'Unknown'}</p>
                                                        <p className="text-xs text-gray-500">{activity.student?.email || ''}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold border bg-indigo-50 text-indigo-700 border-indigo-200">
                                                    {formatActionName(activity.action)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {activity.subject ? (
                                                    <span className="text-sm">{activity.subject.name}</span>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">N/A</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-600">
                                                {new Date(activity.created_at).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                                            No recent activities found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    {activities.links && activities.links.length > 3 && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{activities.from || 0}</span> to{' '}
                                <span className="font-semibold text-gray-900">{activities.to || 0}</span> of{' '}
                                <span className="font-semibold text-gray-900">{activities.total}</span> activities
                            </p>

                            <div className="flex items-center gap-1">
                                {activities.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        preserveScroll
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                            link.active
                                                ? 'bg-sky-600 text-white font-bold'
                                                : link.url
                                                ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
