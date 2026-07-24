import { Link, usePage } from '@inertiajs/react';

export default function SuperAdminSidebar({ activeItem = '' }) {
    const { url, props } = usePage();
    const user = props.auth?.user;

    const safeRoute = (name, fallback) => {
        try {
            return route(name);
        } catch (e) {
            return fallback;
        }
    };

    const isActive = (path) => url.startsWith(path) || url === path || activeItem === path;

    return (
        <aside className="fixed left-0 top-0 h-screen flex flex-col py-6 overflow-y-auto w-64 bg-surface-container-lowest border-r border-outline-variant/10 sidebar-scroll z-50">
            <div className="px-6 mb-8">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg">
                        <span className="material-symbols-outlined text-white">school</span>
                    </div>
                    <div>
                        <h1 className="font-title-md text-title-md font-extrabold text-primary leading-none" style={{ fontSize: '20px', lineHeight: '28px' }}>Academic Nexus</h1>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Admin Portal</p>
                    </div>
                </div>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                <Link
                    href={safeRoute('dashboard', '/dashboard')}
                    className={`flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-all ${
                        isActive('/dashboard')
                            ? 'text-primary font-bold bg-primary-container/10 border-r-4 border-primary opacity-80'
                            : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                >
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="font-label-md text-label-md">Dashboard</span>
                </Link>
                <Link
                    href={safeRoute('admin.institutions', '/admin/institutions')}
                    className={`flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-all ${
                        isActive('/admin/institutions') || activeItem === 'Institutions'
                            ? 'text-primary font-bold bg-primary-container/10 border-r-4 border-primary opacity-80'
                            : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                >
                    <span className="material-symbols-outlined">domain</span>
                    <span className="font-label-md text-label-md">Institutions</span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                >
                    <span className="material-symbols-outlined">admin_panel_settings</span>
                    <span className="font-label-md text-label-md">Institution Admins</span>
                </Link>
                <Link
                    href={safeRoute('admin.users', '/admin/users')}
                    className={`flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-all ${
                        isActive('/admin/users') || activeItem === 'Users'
                            ? 'text-primary font-bold bg-primary-container/10 border-r-4 border-primary opacity-80'
                            : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                >
                    <span className="material-symbols-outlined">manage_accounts</span>
                    <span className="font-label-md text-label-md">Users Management</span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                >
                    <span className="material-symbols-outlined">analytics</span>
                    <span className="font-label-md text-label-md">Platform Analytics</span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                >
                    <span className="material-symbols-outlined">monitor_heart</span>
                    <span className="font-label-md text-label-md">System Monitoring</span>
                </Link>
                <Link
                    href={safeRoute('admin.useractivity', '/admin/useractivity')}
                    className={`flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-all ${
                        isActive('/admin/useractivity') || activeItem === 'User Activity'
                            ? 'text-primary font-bold bg-primary-container/10 border-r-4 border-primary opacity-80'
                            : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                >
                    <span className="material-symbols-outlined">security</span>
                    <span className="font-label-md text-label-md">Security & Audit Logs</span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                >
                    <span className="material-symbols-outlined">rule</span>
                    <span className="font-label-md text-label-md">Roles & Permissions</span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                >
                    <span className="material-symbols-outlined">description</span>
                    <span className="font-label-md text-label-md">Reports</span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                >
                    <span className="material-symbols-outlined">campaign</span>
                    <span className="font-label-md text-label-md">Announcements</span>
                </Link>
                <Link
                    href={safeRoute('questions.index', '/questions')}
                    className={`flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-all ${
                        isActive('/questions') || activeItem === 'Questions'
                            ? 'text-primary font-bold bg-primary-container/10 border-r-4 border-primary opacity-80'
                            : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                >
                    <span className="material-symbols-outlined">support_agent</span>
                    <span className="font-label-md text-label-md">Support/Tickets</span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                >
                    <span className="material-symbols-outlined">payments</span>
                    <span className="font-label-md text-label-md">Subscription/Billing</span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                >
                    <span className="material-symbols-outlined">settings_applications</span>
                    <span className="font-label-md text-label-md">System Configuration</span>
                </Link>
            </nav>
            <div className="px-4 mt-auto pt-6 border-t border-outline-variant/10 pb-4">
                <Link
                    href={safeRoute('profile.edit', '/profile')}
                    className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                >
                    <span className="material-symbols-outlined">settings</span>
                    <span className="font-label-md text-label-md">Settings</span>
                </Link>
                <div className="mt-4 p-4 bg-surface-container-low rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white ring-2 ring-white shadow-sm uppercase font-bold text-lg shrink-0">
                        {user?.name ? user.name.charAt(0) : 'A'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-label-md text-label-md text-on-surface truncate">{user?.name || 'Admin'}</p>
                        <p className="text-[10px] text-on-surface-variant truncate">Global Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
