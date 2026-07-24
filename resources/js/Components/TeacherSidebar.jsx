import { Link, usePage } from '@inertiajs/react';

export default function TeacherSidebar() {
    const { url } = usePage();
    const user = usePage().props.auth.user;

    const isActive = (path) => url.startsWith(path);

    return (
        <aside className="fixed left-0 top-0 h-screen flex flex-col py-6 overflow-y-auto w-64 bg-surface-container-lowest border-r border-outline-variant/10 z-50 sidebar-scroll">
            <div className="px-6 mb-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                </div>
                <div>
                    <h1 className="font-headline-md text-headline-md font-extrabold text-primary" style={{ fontSize: '20px', lineHeight: '28px' }}>Academic Nexus</h1>
                    <p className="font-label-md text-label-md text-on-surface-variant">Teacher Portal</p>
                </div>
            </div>
            <nav className="flex-1 px-2">
                <ul className="space-y-1">
                    <li>
                        <Link
                            href={route('dashboard')}
                            className={`flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-all ${
                                isActive('/dashboard') || url === '/'
                                    ? 'text-primary font-bold bg-primary-container/10 border-r-4 border-primary'
                                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                            }`}
                        >
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="font-label-md text-label-md">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                        >
                            <span className="material-symbols-outlined">book</span>
                            <span className="font-label-md text-label-md">My Subjects</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('questions.index')}
                            className={`flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-all ${
                                isActive('/questions')
                                    ? 'text-primary font-bold bg-primary-container/10 border-r-4 border-primary'
                                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                            }`}
                        >
                            <span className="material-symbols-outlined">forum</span>
                            <span className="font-label-md text-label-md">Discussions</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('assignments.index')}
                            className={`flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-all ${
                                isActive('/assignments')
                                    ? 'text-primary font-bold bg-primary-container/10 border-r-4 border-primary'
                                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                            }`}
                        >
                            <span className="material-symbols-outlined">assignment</span>
                            <span className="font-label-md text-label-md">Assignments</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('resources.index')}
                            className={`flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-all ${
                                isActive('/resources')
                                    ? 'text-primary font-bold bg-primary-container/10 border-r-4 border-primary'
                                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                            }`}
                        >
                            <span className="material-symbols-outlined">folder_open</span>
                            <span className="font-label-md text-label-md">Resources</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                        >
                            <span className="material-symbols-outlined">group</span>
                            <span className="font-label-md text-label-md">Students</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                        >
                            <span className="material-symbols-outlined">analytics</span>
                            <span className="font-label-md text-label-md">Learning Insights</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                        >
                            <span className="material-symbols-outlined">grading</span>
                            <span className="font-label-md text-label-md">Gradebook</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                        >
                            <span className="material-symbols-outlined">calendar_today</span>
                            <span className="font-label-md text-label-md">Calendar</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={route('profile.edit')}
                            className="flex items-center gap-4 px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-on-surface transition-all"
                        >
                            <span className="material-symbols-outlined">settings</span>
                            <span className="font-label-md text-label-md">Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
