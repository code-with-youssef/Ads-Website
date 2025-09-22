<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdValidationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'        => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'min:10'],
            'ad_plan_id' => 'required|exists:ad_plans,id',
            'price' =>'required|numeric'
        ];
    }


    public function messages(): array
    {
        return [
            'name.required'        => 'The name field is required.',
            'name.string'          => 'The name must be a string.',
            'name.max'             => 'The name may not be greater than 255 characters.',

            'description.required' => 'The description field is required.',
            'description.string'   => 'The description must be a string.',
            'description.min'      => 'The description must be at least 10 characters.',

            'price.required'        => 'The cost field is required.',
            'price.numeric'         => 'The cost must be a number.',

        ];
    }
}
