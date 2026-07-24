<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateResourceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'attachment' => 'nullable|file|max:10240',
            'type' => 'required|string|in:PDF,VIDEO,PRESENTATION,LINK,DOCUMENT,OTHER',
            'file_url' => 'nullable|string|max:255',
        ];
    }
}
