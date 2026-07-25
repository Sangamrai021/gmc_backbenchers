import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationDropdown({ notifications, onClose }) {
    const getIcon = (type) => {
        if (type.startsWith('assignment')) return 'assignment';
        if (type.startsWith('question') || type.startsWith('answer')) return 'forum';
        if (type.startsWith('resource')) return 'folder_open';
        if (type.startsWith('announcement')) return 'campaign';
        return 'notifications';
    };

    const getIconColor = (type) => {
        if (type.startsWith('assignment')) return 'text-primary bg-primary/10';
        if (type.startsWith('question') || type.startsWith('answer')) return 'text-secondary bg-secondary/10';
        if (type.startsWith('resource')) return 'text-success bg-success/10';
        if (type.startsWith('announcement')) return 'text-error bg-error/10';
        return 'text-on-surface-variant bg-surface-container-high';
    };

    const handleMarkAsRead = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await axios.post(route('notifications.mark_read', id));
            // Trigger a re-fetch or optimistically update local state here if needed
        } catch (error) {
            console.error('Failed to mark as read', error);
        }
    };

    return (
        <div className="w-80 sm:w-96 max-h-[80vh] flex flex-col bg-surface rounded-xl shadow-lg border border-outline-variant overflow-hidden">
            <div className="px-4 py-3 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
                <h3 className="font-title-md font-bold text-on-surface">Notifications</h3>
                <Link 
                    href={route('notifications.read_all')} 
                    method="post" 
                    as="button"
                    className="text-label-sm font-semibold text-primary hover:text-primary/80"
                    onClick={onClose}
                >
                    Mark all read
                </Link>
            </div>

            <div className="overflow-y-auto flex-1">
                {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-on-surface-variant flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">notifications_paused</span>
                        <p className="font-body-sm">You're all caught up!</p>
                    </div>
                ) : (
                    <div className="divide-y divide-outline-variant/50">
                        {notifications.map((notification) => (
                            <Link 
                                key={notification.id}
                                href={notification.link || '#'}
                                onClick={async (e) => {
                                    if (!notification.read_at) {
                                        await handleMarkAsRead(notification.id, e);
                                    }
                                    onClose();
                                }}
                                className={`block p-4 hover:bg-surface-container-low transition-colors ${!notification.read_at ? 'bg-primary/5' : ''}`}
                            >
                                <div className="flex gap-3">
                                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(notification.type)}`}>
                                        <span className="material-symbols-outlined text-[20px]">{getIcon(notification.type)}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-0.5 gap-2">
                                            <p className={`text-body-sm font-semibold truncate ${!notification.read_at ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                                                {notification.title}
                                            </p>
                                            <span className="shrink-0 text-label-sm text-outline">
                                                {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <p className={`text-body-sm line-clamp-2 ${!notification.read_at ? 'text-on-surface-variant' : 'text-outline'}`}>
                                            {notification.message}
                                        </p>
                                    </div>
                                    {!notification.read_at && (
                                        <div className="shrink-0 self-center ml-1">
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-2 border-t border-outline-variant bg-surface-container-lowest text-center">
                <Link
                    href={route('notifications.index')}
                    onClick={onClose}
                    className="block w-full py-2 text-label-md font-semibold text-primary hover:bg-surface-container-low rounded-lg transition-colors"
                >
                    View All Notifications
                </Link>
            </div>
        </div>
    );
}
