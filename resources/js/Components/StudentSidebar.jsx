import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function StudentSidebar({ activeItem = '' }) {
    const { url, props } = usePage();
    const { auth } = props;
    const user = auth?.user;
    const [collapsed, setCollapsed] = useState(false);
    const [subjectsOpen, setSubjectsOpen] = useState(false);

    const safeRoute = (name, fallback) => {
        try {
            return route(name);
        } catch (e) {
            return fallback;
        }
    };

    return (
        <aside
            className={`bg-indigo-900 text-indigo-100 min-h-screen border-r border-indigo-800 flex flex-col justify-between transition-all duration-300 z-30 shrink-0 ${
                collapsed ? 'w-20' : 'w-64'
            }`}
        >
            {/* Header */}
            <div>
                <div className="h-16 px-4 flex items-center justify-between border-b border-indigo-800">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md shadow-indigo-500/20">
                            ST
                        </div>
                        {!collapsed && (
                            <div className="flex flex-col truncate">
                                <span className="font-bold text-sm text-white tracking-wide truncate">
                                    Student Portal
                                </span>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 rounded-lg bg-indigo-800/80 text-indigo-400 hover:text-white hover:bg-indigo-800 transition-colors focus:outline-none"
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

                {/* Navigation Links */}
                <nav className="px-3 py-4 space-y-1">
                    <Link
                        href={safeRoute('student.dashboard', '/student/dashboard')}
                        title={collapsed ? 'Dashboard' : undefined}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                            url.startsWith('/student/dashboard') || activeItem === 'Dashboard'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                                : 'text-indigo-300 hover:bg-indigo-800/80 hover:text-white'
                        }`}
                    >
                        <span className="text-indigo-300 group-hover:text-indigo-200">
                            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </span>
                        {!collapsed && <span className="truncate">Dashboard</span>}
                    </Link>

                    <div>
                        <button
                            onClick={() => setSubjectsOpen(!subjectsOpen)}
                            className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                url.startsWith('/subjects') || activeItem === 'Subjects'
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                                    : 'text-indigo-300 hover:bg-indigo-800/80 hover:text-white'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-indigo-300 group-hover:text-indigo-200">
                                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </span>
                                {!collapsed && <span className="truncate">Subjects</span>}
                            </div>
                            {!collapsed && (
                                <svg className={`w-4 h-4 transition-transform ${subjectsOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            )}
                        </button>
                        
                        {/* Placeholder for Subject sub-items, only show if not collapsed and open */}
                        {!collapsed && subjectsOpen && (
                            <div className="pl-11 mt-1 space-y-1">
                                <Link href="#" className="block py-2 text-sm text-indigo-400 hover:text-white">Mathematics</Link>
                                <Link href="#" className="block py-2 text-sm text-indigo-400 hover:text-white">Physics</Link>
                                <Link href="#" className="block py-2 text-sm text-indigo-400 hover:text-white">Computer Science</Link>
                            </div>
                        )}
                    </div>

                    <Link
                        href={safeRoute('feed', '/feed')}
                        title={collapsed ? 'Feed' : undefined}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                            url.startsWith('/feed') || activeItem === 'Feed'
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                                : 'text-indigo-300 hover:bg-indigo-800/80 hover:text-white'
                        }`}
                    >
                        <span className="text-indigo-300 group-hover:text-indigo-200">
                            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </span>
                        {!collapsed && <span className="truncate">Feed</span>}
                    </Link>
                </nav>
            </div>

            {/* Footer / User Profile & Logout */}
            <div className="p-3 border-t border-indigo-800/80 bg-indigo-950/40">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-indigo-800 text-indigo-300 font-semibold text-xs flex items-center justify-center shrink-0 border border-indigo-700">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        {!collapsed && (
                            <div className="flex flex-col truncate">
                                <span className="text-xs font-semibold text-white truncate">
                                    {user?.name || 'Student'}
                                </span>
                                <span className="text-[10px] text-indigo-400 truncate">
                                    {user?.email || 'student@edupulse.edu'}
                                </span>
                            </div>
                        )}
                    </div>

                    {!collapsed && (
                        <Link
                            href={safeRoute('logout', '/logout')}
                            method="post"
                            as="button"
                            className="p-1.5 rounded-lg text-indigo-400 hover:text-rose-400 hover:bg-indigo-800 transition-colors shrink-0"
                            title="Log Out"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3-3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </aside>
    );
}
