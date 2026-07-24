import SuperAdminSidebar from '@/Components/SuperAdminSidebar';
import Dropdown from '@/Components/Dropdown';
import { usePage } from '@inertiajs/react';

export default function SuperAdminLayout({ header, children, activeItem = '' }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900">
            {/* Super Admin Sidebar */}
            <SuperAdminSidebar activeItem={activeItem} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navigation Bar */}
                <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between shadow-sm sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg font-bold text-gray-800 tracking-tight">
                            {header || 'Super Admin Panel'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-lg bg-gray-50 border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
                                >
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    {user?.name || 'Super Admin'}
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content align="right">
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile Settings
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
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
