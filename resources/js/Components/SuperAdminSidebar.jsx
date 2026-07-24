import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function SuperAdminSidebar({ activeItem = '' }) {
    const { url, props } = usePage();
    const { auth } = props;
    const user = auth?.user;
    const [collapsed, setCollapsed] = useState(false);

    const safeRoute = (name, fallback) => {
        try {
            return route(name);
        } catch (e) {
            return fallback;
        }
    };

    const navItems = [
        {
            name: 'Dashboard',
            href: safeRoute('dashboard', '/dashboard'),
            active: url === '/dashboard' || url.startsWith('/admin/dashboard') || activeItem === 'Dashboard',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            name: 'Users',
            href: safeRoute('admin.users', '/admin/users'),
            active: url.startsWith('/admin/users') || activeItem === 'Users',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
        {
            name: 'Institutions',
            href: safeRoute('admin.institutions', '/admin/institutions'),
            active: url.startsWith('/admin/institutions') || activeItem === 'Institutions',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
        },
        {
            name: 'Questions',
            href: safeRoute('questions.index', '/questions'),
            active: url.startsWith('/questions') || activeItem === 'Questions',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            name: 'User Activity',
            href: safeRoute('admin.useractivity', '/admin/useractivity'),
            active: url.startsWith('/admin/useractivity') || activeItem === 'User Activity',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
    ];

    return (
        <aside
            className={`bg-slate-900 text-slate-100 min-h-screen border-r border-slate-800 flex flex-col justify-between transition-all duration-300 z-30 shrink-0 ${
                collapsed ? 'w-20' : 'w-64'
            }`}
        >
            {/* Header */}
            <div>
                <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md shadow-sky-500/20">
                            SA
                        </div>
                        {!collapsed && (
                            <div className="flex flex-col truncate">
                                <span className="font-bold text-sm text-white tracking-wide truncate">
                                    Super Admin
                                </span>
                                <span className="text-[11px] text-sky-400 font-medium tracking-tight">
                                    Control Panel
                                </span>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
                        title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={collapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'}
                            />
                        </svg>
                    </button>
                </div>

                {/* Section Title */}
                {!collapsed && (
                    <div className="px-4 pt-5 pb-2">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Super Admin Sidebar
                        </p>
                    </div>
                )}

                {/* Navigation Links */}
                <nav className="px-3 py-2 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            title={collapsed ? item.name : undefined}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                item.active
                                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 font-semibold'
                                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                            }`}
                        >
                            <span className={`${item.active ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                {item.icon}
                            </span>
                            {!collapsed && <span className="truncate">{item.name}</span>}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Footer / User Profile & Logout */}
            <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-semibold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        {!collapsed && (
                            <div className="flex flex-col truncate">
                                <span className="text-xs font-semibold text-white truncate">
                                    {user?.name || 'Super Admin'}
                                </span>
                                <span className="text-[10px] text-slate-400 truncate">
                                    {user?.email || 'admin@edupulse.edu'}
                                </span>
                            </div>
                        )}
                    </div>

                    {!collapsed && (
                        <Link
                            href={safeRoute('logout', '/logout')}
                            method="post"
                            as="button"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors shrink-0"
                            title="Log Out"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </aside>
    );
}
