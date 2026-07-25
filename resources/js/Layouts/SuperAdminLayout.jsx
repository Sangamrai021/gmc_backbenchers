import SuperAdminSidebar from '@/Components/SuperAdminSidebar';
import Dropdown from '@/Components/Dropdown';
import { usePage } from '@inertiajs/react';

export default function SuperAdminLayout({ header, children, activeItem = '' }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-surface font-sans text-on-surface pl-64 flex flex-col">
            {/* Super Admin Sidebar */}
            <SuperAdminSidebar activeItem={activeItem} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 w-full">
                {/* Top Navigation Bar */}
                <header className="h-16 bg-surface-container-lowest border-b border-outline-variant/10 px-4 sm:px-6 flex items-center justify-between shadow-sm sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                            {header || 'Super Admin Panel'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Global Search Stub */}
                        <div className="hidden md:flex relative group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
                            <input 
                                type="text" 
                                placeholder="Search institutions, users..." 
                                className="pl-10 pr-4 py-2 w-64 bg-surface-container-low border-none rounded-full font-body-sm focus:ring-2 focus:ring-primary/20 transition-all text-on-surface"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                <kbd className="hidden lg:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-on-surface-variant bg-surface-container-highest rounded">⌘</kbd>
                                <kbd className="hidden lg:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-on-surface-variant bg-surface-container-highest rounded">K</kbd>
                            </div>
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-full transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface-container-lowest"></span>
                        </button>

                        <div className="h-6 w-[1px] bg-outline-variant/30 hidden sm:block"></div>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-full bg-surface-container-low border border-outline-variant/20 px-4 py-1.5 font-label-md text-on-surface hover:bg-surface-container-high transition-colors focus:outline-none"
                                >
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                    {user?.name || 'Super Admin'}
                                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">expand_more</span>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content align="right">
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile Settings
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button" onClick={(e) => { if (!confirm('Do you want to logout?')) e.preventDefault(); }}>
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Page Body */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
