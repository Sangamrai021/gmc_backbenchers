import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import QuestionCard from '@/Components/QuestionCard';
import { Head, Link } from '@inertiajs/react';

export default function Index({ discussions, filters }) {
    return (
        <AuthenticatedLayout header="Discussions">
            <Head title="Discussions" />

            <div className="max-w-5xl mx-auto space-y-8 pb-12 mt-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div>
                        <h2 className="text-2xl font-bold text-on-surface">Community Q&A</h2>
                        <p className="text-sm text-on-surface-variant font-medium mt-1">Explore doubts, share knowledge, and learn together.</p>
                    </div>
                    <Link
                        href={route('questions.create')}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all font-bold flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[20px]">edit_square</span>
                        Ask a Question
                    </Link>
                </div>

                {/* Filters / Tabs (Placeholder for future) */}
                <div className="flex gap-2 pb-2 overflow-x-auto custom-scrollbar">
                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold text-sm cursor-pointer border border-primary/20">All Questions</span>
                    <span className="bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container px-4 py-2 rounded-xl font-medium text-sm cursor-pointer border border-transparent hover:border-surface-container-high transition-colors">My Questions</span>
                    <span className="bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container px-4 py-2 rounded-xl font-medium text-sm cursor-pointer border border-transparent hover:border-surface-container-high transition-colors">Unanswered</span>
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                    {discussions.data.length === 0 ? (
                        <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-outline-variant">
                            <div className="w-20 h-20 bg-surface-container mx-auto rounded-full flex items-center justify-center mb-4 text-outline">
                                <span className="material-symbols-outlined text-4xl">forum</span>
                            </div>
                            <p className="text-on-surface-variant text-lg font-bold">No questions found.</p>
                            <Link
                                href={route('questions.create')}
                                className="mt-4 inline-block text-primary font-bold hover:underline"
                            >
                                Be the first to start a discussion
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {discussions.data.map((discussion) => (
                                <QuestionCard key={discussion.id} discussion={discussion} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {discussions.total > discussions.per_page && (
                    <div className="mt-8 flex justify-center gap-2">
                        {discussions.links.map((link, i) => {
                            const isNumber = !isNaN(link.label);
                            return (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
                                        link.active
                                            ? 'bg-primary text-white shadow-md'
                                            : link.url 
                                                ? 'bg-white text-on-surface-variant hover:bg-surface-container-lowest hover:text-on-surface border border-surface-container-low shadow-sm hover:shadow' 
                                                : 'bg-transparent text-outline cursor-not-allowed opacity-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
