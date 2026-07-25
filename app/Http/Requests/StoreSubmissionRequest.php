<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubmissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'content' => 'required_without:files|string|nullable',
            'files' => 'required_without:content|array|nullable',
            'files.*' => 'file|max:10240', // 10MB max per file
        ];
    }

    public function messages(): array
    {
        return [
            'content.required_without' => 'You must provide either content or at least one file.',
            'files.required_without' => 'You must provide either content or at least one file.',
            'files.*.max' => 'Each file must not be larger than 10MB.',
        ];
    }
}
