import { Link, usePage } from '@inertiajs/react';

export default function StudentSidebar({ activeItem = '' }) {
    const { url, props } = usePage();
    const { auth } = props;
    const user = auth?.user;

    const navItems = [
        { name: 'Dashboard', icon: 'dashboard', route: 'student.dashboard', fallback: '/student/dashboard', pattern: '/student/dashboard' },
        { name: 'My Subjects', icon: 'auto_stories', route: 'subjects.index', fallback: '/subjects', pattern: '/subjects' },
        { name: 'Discussions', icon: 'forum', route: 'questions.index', fallback: '/questions', pattern: '/questions' },
        { name: 'Assignments', icon: 'assignment', route: 'assignments.index', fallback: '/assignments', pattern: '/assignments' },
        { name: 'Resources', icon: 'folder_open', route: 'resources.index', fallback: '/resources', pattern: '/resources' },
        { name: 'Calendar', icon: 'calendar_month', route: '#', fallback: '#', pattern: '/calendar' },
        { name: 'Notifications', icon: 'notifications', route: '#', fallback: '#', pattern: '/notifications' },
        { name: 'Learning Insights', icon: 'analytics', route: '#', fallback: '#', pattern: '/insights' },
        { name: 'Achievements', icon: 'emoji_events', route: '#', fallback: '#', pattern: '/achievements' },
        { name: 'Profile', icon: 'account_circle', route: 'profile.edit', fallback: '/profile', pattern: '/profile' },
        { name: 'Settings', icon: 'settings', route: '#', fallback: '#', pattern: '/settings' },
    ];

    const safeRoute = (name, fallback) => {
        try {
            return route(name);
        } catch (e) {
            return fallback;
        }
    };

    return (
        <aside className="h-screen w-72 fixed left-0 top-0 bg-white dark:bg-inverse-surface shadow-sm flex flex-col py-stack-unit z-50">
            <div className="px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: '"FILL" 1' }}>school</span>
                </div>
                <div className="overflow-hidden">
                    <h1 className="font-headline-md text-headline-md font-bold text-primary truncate">{user?.name || 'Khilaraj'}</h1>
                    <p className="text-label-sm text-on-surface-variant truncate">Semester 4 • Academic Institute</p>
                </div>
            </div>
            
            <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = url.startsWith(item.pattern) || activeItem === item.name;
                    return (
                        <Link
                            key={item.name}
                            href={safeRoute(item.route, item.fallback)}
                            className={`flex items-center gap-3 px-4 py-3 group transition-colors ${
                                isActive
                                    ? 'text-primary font-bold border-r-4 border-primary hover:bg-surface-container-low rounded-l-lg'
                                    : 'text-on-surface-variant hover:bg-surface-container-low rounded-lg'
                            }`}
                        >
                            <span className="material-symbols-outlined group-active:scale-[0.98]">{item.icon}</span>
                            <span className="font-label-md text-label-md">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            
            <div className="px-4 py-4 border-t border-surface-container">
                <Link
                    href={safeRoute('logout', '/logout')}
                    method="post"
                    as="button"
                    className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-lg group"
                >
                    <span className="material-symbols-outlined group-active:scale-[0.98]">logout</span>
                    <span className="font-label-md text-label-md">Logout</span>
                </Link>
            </div>
        </aside>
    );
}
