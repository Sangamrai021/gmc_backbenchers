import { router } from '@inertiajs/react';

export default function VoteButtons({ votableType, votableId, upvotes = 0, downvotes = 0 }) {
    const score = upvotes - downvotes;

    const handleVote = (type) => {
        router.post(route('questions.vote'), {
            votable_type: votableType,
            votable_id: votableId,
            type: type,
        });
    };

    return (
        <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-1 py-0.5">
            <button
                onClick={(e) => { e.preventDefault(); handleVote('upvote'); }}
                className="text-gray-400 hover:text-green-600 hover:bg-green-50 p-1 rounded transition-colors"
                title="Upvote"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                </svg>
            </button>
            <span className="text-xs font-bold text-gray-700 min-w-[1.2rem] text-center">{score}</span>
            <button
                onClick={(e) => { e.preventDefault(); handleVote('downvote'); }}
                className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                title="Downvote"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    );
}
