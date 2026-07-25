import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsIndex({ auth, notifications, filters }) {
    const { type, status } = filters;

    const getIcon = (itemType) => {
        if (itemType.startsWith('assignment')) return 'assignment';
        if (itemType.startsWith('question') || itemType.startsWith('answer')) return 'forum';
        if (itemType.startsWith('resource')) return 'folder_open';
        if (itemType.startsWith('announcement')) return 'campaign';
        return 'notifications';
    };

    const getIconColor = (itemType) => {
        if (itemType.startsWith('assignment')) return 'text-primary bg-primary/10';
        if (itemType.startsWith('question') || itemType.startsWith('answer')) return 'text-secondary bg-secondary/10';
        if (itemType.startsWith('resource')) return 'text-success bg-success/10';
        if (itemType.startsWith('announcement')) return 'text-error bg-error/10';
        return 'text-on-surface-variant bg-surface-container-high';
    };

    const handleFilter = (filterType, filterValue) => {
        const query = { ...filters };
        
        if (filterValue) {
            query[filterType] = filterValue;
        } else {
            delete query[filterType];
        }

        router.get(route('notifications.index'), query, { preserveState: true });
    };

    const handleMarkAsRead = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await axios.post(route('notifications.mark_read', id));
            router.reload({ only: ['notifications', 'auth'] });
        } catch (error) {
            console.error('Failed to mark as read', error);
        }
    };

    return (
        <AuthenticatedLayout header="Notifications">
            <Head title="Notifications" />

            <div className="max-w-4xl mx-auto py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">Notification Center</h1>
                        <p className="text-body-md text-on-surface-variant">Stay updated with your latest academic activities.</p>
                    </div>
                    
                    <Link
                        href={route('notifications.read_all')}
                        method="post"
                        as="button"
                        className="px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md rounded-lg transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[20px]">done_all</span>
                        Mark all as read
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-surface border border-outline-variant rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center">
                    <div className="flex bg-surface-container-low rounded-lg p-1">
                        <button
                            onClick={() => handleFilter('status', null)}
                            className={`px-4 py-1.5 rounded-md font-label-sm transition-colors ${!status ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleFilter('status', 'unread')}
                            className={`px-4 py-1.5 rounded-md font-label-sm transition-colors ${status === 'unread' ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
                        >
                            Unread
                        </button>
                    </div>

                    <div className="h-6 w-[1px] bg-outline-variant"></div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleFilter('type', null)}
                            className={`px-3 py-1.5 rounded-full font-label-sm border transition-colors ${!type ? 'bg-primary text-white border-primary' : 'bg-transparent border-outline-variant text-on-surface-variant hover:bg-surface-container-low'}`}
                        >
                            All Types
                        </button>
                        <button
                            onClick={() => handleFilter('type', 'assignment.created')}
                            className={`px-3 py-1.5 rounded-full font-label-sm border transition-colors ${type === 'assignment.created' ? 'bg-primary text-white border-primary' : 'bg-transparent border-outline-variant text-on-surface-variant hover:bg-surface-container-low'}`}
                        >
                            Assignments
                        </button>
                        <button
                            onClick={() => handleFilter('type', 'question.posted')}
                            className={`px-3 py-1.5 rounded-full font-label-sm border transition-colors ${type === 'question.posted' ? 'bg-primary text-white border-primary' : 'bg-transparent border-outline-variant text-on-surface-variant hover:bg-surface-container-low'}`}
                        >
                            Discussions
                        </button>
                        <button
                            onClick={() => handleFilter('type', 'resource.uploaded')}
                            className={`px-3 py-1.5 rounded-full font-label-sm border transition-colors ${type === 'resource.uploaded' ? 'bg-primary text-white border-primary' : 'bg-transparent border-outline-variant text-on-surface-variant hover:bg-surface-container-low'}`}
                        >
                            Resources
                        </button>
                        <button
                            onClick={() => handleFilter('type', 'announcement.published')}
                            className={`px-3 py-1.5 rounded-full font-label-sm border transition-colors ${type === 'announcement.published' ? 'bg-primary text-white border-primary' : 'bg-transparent border-outline-variant text-on-surface-variant hover:bg-surface-container-low'}`}
                        >
                            Announcements
                        </button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                    {notifications.data.length === 0 ? (
                        <div className="p-12 text-center text-on-surface-variant flex flex-col items-center">
                            <span className="material-symbols-outlined text-6xl mb-4 opacity-30">notifications_off</span>
                            <h3 className="text-title-lg font-bold text-on-surface mb-2">No notifications found</h3>
                            <p className="text-body-md">You're completely caught up. Check back later for updates.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-outline-variant/50">
                            {notifications.data.map((notification) => (
                                <Link
                                    key={notification.id}
                                    href={notification.link || '#'}
                                    onClick={async (e) => {
                                        if (!notification.read_at) {
                                            await handleMarkAsRead(notification.id, e);
                                        }
                                    }}
                                    className={`flex p-5 gap-4 hover:bg-surface-container-lowest transition-colors ${!notification.read_at ? 'bg-primary/5' : ''}`}
                                >
                                    <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getIconColor(notification.type)}`}>
                                        <span className="material-symbols-outlined text-[24px]">{getIcon(notification.type)}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1 gap-4">
                                            <h4 className={`text-title-md font-bold ${!notification.read_at ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                                                {notification.title}
                                            </h4>
                                            <span className="shrink-0 text-label-md text-outline">
                                                {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <p className={`text-body-md leading-relaxed ${!notification.read_at ? 'text-on-surface-variant' : 'text-outline'}`}>
                                            {notification.message}
                                        </p>
                                    </div>
                                    {!notification.read_at && (
                                        <div className="shrink-0 self-center ml-2">
                                            <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20"></div>
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {notifications.last_page > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        {notifications.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-lg font-label-md transition-colors ${
                                    link.active 
                                        ? 'bg-primary text-white' 
                                        : !link.url 
                                            ? 'text-outline pointer-events-none' 
                                            : 'bg-surface border border-outline-variant text-on-surface hover:bg-surface-container-low'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
