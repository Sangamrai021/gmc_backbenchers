import { Link } from '@inertiajs/react';
import VoteButtons from '@/Components/VoteButtons';

export default function QuestionCard({ discussion }) {
    const statusColors = {
        open: 'bg-green-100 text-green-800',
        answered: 'bg-blue-100 text-blue-800',
        closed: 'bg-gray-100 text-gray-800',
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
                <VoteButtons
                    votableType="discussion"
                    votableId={discussion.id}
                    upvotes={discussion.upvotes_count}
                    downvotes={discussion.downvotes_count}
                />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500">
                            {discussion.discussionable_type === 'subject'
                                ? discussion.discussionable?.name
                                : discussion.discussionable_type}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[discussion.status] || statusColors.open}`}>
                            {discussion.status}
                        </span>
                    </div>

                    <Link
                        href={route('questions.show', discussion.id)}
                        className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                    >
                        {discussion.title}
                    </Link>

                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {discussion.body}
                    </p>

                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                        <span>by {discussion.author_name}</span>
                        <span>{discussion.answers_count} {discussion.answers_count === 1 ? 'answer' : 'answers'}</span>
                        <span>{new Date(discussion.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
