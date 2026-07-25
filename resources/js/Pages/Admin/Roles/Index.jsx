import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function Index({ users, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const { props } = usePage();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(route('admin.roles'), { search }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleRoleChange = (userId, newRole) => {
        router.put(route('admin.roles.update', userId), { role: newRole }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // optionally show a toast notification
            }
        });
    };

    const roles = [
        { value: 'super_admin', label: 'Super Admin', color: 'bg-primary-container/20 text-primary' },
        { value: 'institution_admin', label: 'Inst. Admin', color: 'bg-secondary-container/20 text-secondary' },
        { value: 'teacher', label: 'Teacher', color: 'bg-tertiary-container/20 text-tertiary' },
        { value: 'student', label: 'Student', color: 'bg-surface-container-highest text-on-surface-variant' },
        { value: 'user', label: 'User', color: 'bg-gray-200 text-gray-700' }
    ];

    const getRoleBadgeColor = (roleStr) => {
        const r = roles.find(r => r.value === roleStr);
        return r ? r.color : 'bg-gray-200 text-gray-700';
    };

    return (
        <SuperAdminLayout activeItem="Roles & Permissions" header="Roles & Permissions">
            <Head title="Roles & Permissions" />

            <div className="max-w-7xl mx-auto pb-24">
                {/* Header section */}
                <div className="mb-8">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">Manage Platform Roles</h2>
                    <p className="text-body-lg text-on-surface-variant">Assign and manage access levels for all registered users across the platform.</p>
                </div>

                {/* Filters */}
                <div className="glass-card rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white shadow-sm">
                    <div className="relative w-full sm:w-96">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-lg font-body-sm focus:ring-2 focus:ring-primary/20 transition-all text-on-surface"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="glass-card rounded-xl overflow-hidden shadow-sm bg-white border border-outline-variant/10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-surface-container-low border-b border-outline-variant/20">
                                <tr>
                                    <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Current Role</th>
                                    <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-right">Assign New Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                {users.data.length > 0 ? (
                                    users.data.map(user => (
                                        <tr key={user.id} className="hover:bg-surface-container-lowest transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-label-md font-bold text-on-surface">{user.name}</p>
                                                        <p className="text-[10px] text-on-surface-variant">Joined {new Date(user.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-body-sm text-on-surface-variant">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getRoleBadgeColor(user.role)}`}>
                                                    {user.role ? user.role.replace('_', ' ') : 'None'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <select
                                                    className="bg-surface-container-low border border-outline-variant/30 text-on-surface text-sm rounded-lg focus:ring-primary/20 focus:border-primary block w-40 ml-auto p-2"
                                                    value={user.role || 'user'}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                >
                                                    {roles.map(r => (
                                                        <option key={r.value} value={r.value}>{r.label}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-on-surface-variant">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {users.links && users.links.length > 3 && (
                    <div className="mt-6 flex justify-center gap-1">
                        {users.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => link.url && router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
                                disabled={!link.url}
                                className={`px-4 py-2 text-sm rounded-lg border ${
                                    link.active 
                                        ? 'bg-primary text-white border-primary' 
                                        : 'bg-white text-on-surface border-outline-variant/30 hover:bg-surface-container-low'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </SuperAdminLayout>
    );
}
