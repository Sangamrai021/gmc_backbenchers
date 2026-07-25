import CommentForm from './CommentForm';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useLanguage } from '../../Context/LanguageContext';

export default function CommentSection({ grievance, comments = [] }) {
  const { lang } = useLanguage();

  function deleteComment(id) {
    if (confirm('Delete this comment?')) {
      router.delete(route('grievances.comments.destroy', id), { preserveScroll: true });
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
        {lang === 'np' ? 'टिप्पणीहरू' : 'Comments'} ({comments.length})
      </h3>

      <CommentForm grievanceId={grievance.id} placeholder={lang === 'np' ? 'टिप्पणी लेख्नुहोस्...' : 'Write a comment...'} />

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">{lang === 'np' ? 'कुनै टिप्पणी छैन' : 'No comments yet'}</p>
        ) : comments.map(comment => (
          <div key={comment.id} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-600 shrink-0">
              {comment.author?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-gray-700">{comment.author}</span>
                <span className="text-[9px] text-gray-400">{comment.bs_created_at}</span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">{comment.body}</p>
            </div>
            {comment.can_delete && (
              <button onClick={() => deleteComment(comment.id)}
                className="text-[9px] text-gray-400 hover:text-red-500 shrink-0">
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}