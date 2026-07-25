import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useLanguage } from '../../Context/LanguageContext';

export default function CommentForm({ grievanceId, onSuccess, placeholder = 'Write a comment...' }) {
  const { t, lang } = useLanguage();
  const { data, setData, post, processing, errors, reset } = useForm({
    body: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!data.body.trim()) return;
    post(route('grievances.comments.store', grievanceId), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-2">
      <input
        type="text"
        value={data.body}
        onChange={e => setData('body', e.target.value)}
        placeholder={placeholder}
        maxLength={1000}
        className="flex-1 text-xs rounded-lg border-gray-200 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-50"
      />
      <button
        type="submit"
        disabled={processing || !data.body.trim()}
        className="shrink-0 px-3 py-2 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {lang === 'np' ? 'पठाउनुहोस्' : 'Send'}
      </button>
      {errors.body && <p className="text-xs text-red-500 mt-1">{errors.body}</p>}
    </form>
  );
}