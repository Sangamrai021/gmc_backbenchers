import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <SuperAdminLayout activeItem="Platform Analytics">
            <Head title="Platform Analytics" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">Platform Analytics</h3>
                            <p className="text-gray-600">
                                This page is currently under construction. Here you will view overall platform usage, user growth, engagement metrics, and other key performance indicators.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
}
