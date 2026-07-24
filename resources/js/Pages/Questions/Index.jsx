import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import QuestionCard from '@/Components/QuestionCard';
import { Head, Link } from '@inertiajs/react';

export default function Index({ discussions, filters }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Questions</h2>
                    <Link
                        href={route('questions.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:outline-none transition"
                    >
                        Ask a Question
                    </Link>
                </div>
            }
        >
            <Head title="Questions" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {discussions.data.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No questions yet.</p>
                            <Link
                                href={route('questions.create')}
                                className="mt-2 inline-block text-indigo-600 hover:text-indigo-800"
                            >
                                Be the first to ask a question
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {discussions.data.map((discussion) => (
                                <QuestionCard key={discussion.id} discussion={discussion} />
                            ))}
                        </div>
                    )}

                    {discussions.total > discussions.per_page && (
                        <div className="mt-6 flex justify-center gap-2">
                            {discussions.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 text-sm rounded ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
