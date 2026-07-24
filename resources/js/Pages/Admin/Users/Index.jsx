import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ users, filters, totalUsers, roleCounts }) {
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearch(val);
        router.get(
            route('admin.users'),
            { search: val, role: roleFilter },
            { preserveState: true, replace: true }
        );
    };

    const handleRoleChange = (e) => {
        const val = e.target.value;
        setRoleFilter(val);
        router.get(
            route('admin.users'),
            { search: search, role: val },
            { preserveState: true, replace: true }
        );
    };

    const getRoleBadgeClass = (role) => {
        switch (role) {
            case 'super_admin':
                return 'bg-rose-100 text-rose-800 border-rose-200';
            case 'institution_admin':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'teacher':
                return 'bg-sky-100 text-sky-800 border-sky-200';
            case 'student':
            default:
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        }
    };

    const formatRoleName = (role) => {
        if (!role) return 'Student';
        return role
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
                            User Management
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            View and manage all registered platform users and role assignments
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-xs font-semibold">
                            Total Users: {totalUsers}
                        </span>
                    </div>
                </div>
            }
        >
            <Head title="Admin - Users List" />

            <div className="space-y-6">
                {/* Metrics Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500">Super Admins</p>
                            <p className="text-xl font-bold text-gray-900 mt-0.5">{roleCounts?.super_admin || 0}</p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
                            SA
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500">Inst. Admins</p>
                            <p className="text-xl font-bold text-gray-900 mt-0.5">{roleCounts?.institution_admin || 0}</p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                            IA
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500">Teachers</p>
                            <p className="text-xl font-bold text-gray-900 mt-0.5">{roleCounts?.teacher || 0}</p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs">
                            T
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500">Students</p>
                            <p className="text-xl font-bold text-gray-900 mt-0.5">{roleCounts?.student || 0}</p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                            S
                        </div>
                    </div>
                </div>

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
                            placeholder="Search by name or email..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <label className="text-xs font-medium text-gray-600 shrink-0">Filter Role:</label>
                        <select
                            value={roleFilter}
                            onChange={handleRoleChange}
                            className="py-2 pl-3 pr-8 rounded-lg border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        >
                            <option value="">All Roles</option>
                            <option value="super_admin">Super Admin</option>
                            <option value="institution_admin">Institution Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                </div>

                {/* Paginated Users Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-3.5">User</th>
                                    <th className="px-6 py-3.5">Role</th>
                                    <th className="px-6 py-3.5">Verification</th>
                                    <th className="px-6 py-3.5">Joined Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-sm">
                                {users.data.length > 0 ? (
                                    users.data.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50/80 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-sky-600 text-white font-semibold text-xs flex items-center justify-center shrink-0">
                                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{user.name}</p>
                                                        <p className="text-xs text-gray-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeClass(user.role)}`}>
                                                    {formatRoleName(user.role)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.email_verified_at ? (
                                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                                                        Unverified
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-600">
                                                {new Date(user.created_at).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                                            No users found matching the selected filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    {users.links && users.links.length > 3 && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{users.from || 0}</span> to{' '}
                                <span className="font-semibold text-gray-900">{users.to || 0}</span> of{' '}
                                <span className="font-semibold text-gray-900">{users.total}</span> users
                            </p>

                            <div className="flex items-center gap-1">
                                {users.links.map((link, idx) => (
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
