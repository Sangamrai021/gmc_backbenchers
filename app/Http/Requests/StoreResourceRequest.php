<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreResourceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorized by policy
    }

    public function rules(): array
    {
        return [
            'subject_id' => 'required|exists:subjects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'attachment' => 'nullable|file|max:10240', // 10MB max
            'type' => 'required|string|in:PDF,VIDEO,PRESENTATION,LINK,DOCUMENT,OTHER',
            'file_url' => 'nullable|string|max:255',
        ];
    }
}
