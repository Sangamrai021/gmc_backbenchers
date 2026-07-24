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
        <div className="flex flex-col items-center space-y-1">
            <button
                onClick={() => handleVote('upvote')}
                className="text-gray-400 hover:text-green-500 transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
            </button>
            <span className="text-sm font-semibold text-gray-700">{score}</span>
            <button
                onClick={() => handleVote('downvote')}
                className="text-gray-400 hover:text-red-500 transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    );
}
