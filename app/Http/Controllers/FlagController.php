<?php

namespace App\Http\Controllers;

use App\Models\Flag;
use App\Models\Grievance;
use App\Models\GrievanceComment;
use Illuminate\Http\Request;

class FlagController extends Controller
{
    public function flagGrievance(Grievance $grievance, Request $request)
    {
        $validated = $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $flag = $grievance->flags()->create([
            'user_id' => auth()->id(),
            'session_id' => auth()->id() ? null : session()->getId(),
            'reason' => $validated['reason'],
        ]);

        return back()->with('success', 'Thank you. Your report has been submitted for review.');
    }

    public function flagComment(GrievanceComment $comment, Request $request)
    {
        $validated = $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        $flag = $comment->flags()->create([
            'user_id' => auth()->id(),
            'session_id' => auth()->id() ? null : session()->getId(),
            'reason' => $validated['reason'],
        ]);

        return back()->with('success', 'Thank you. Your report has been submitted for review.');
    }
}