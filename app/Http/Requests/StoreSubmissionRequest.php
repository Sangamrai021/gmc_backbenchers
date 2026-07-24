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
            'content' => 'required_without:file_url|string|nullable',
            'file_url' => 'required_without:content|string|nullable',
        ];
    }

    public function messages(): array
    {
        return [
            'content.required_without' => 'You must provide either content or a file.',
            'file_url.required_without' => 'You must provide either content or a file.',
        ];
    }
}
