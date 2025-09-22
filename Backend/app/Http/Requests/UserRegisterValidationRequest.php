<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterValidationRequest extends FormRequest
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
            'name' => 'required|string|min:3|max:50',
            'password' => [
                'required',
                'string',
                'confirmed',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
            ],
            'email' => 'required|email|unique:users,email',
            'role' =>'required'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => "Name is required",
            'name.min' => "Name must be at least 3 characters",
            'name.max' => "Name can not exceed 50 characters",

            'password.required' => "Password is required",
            'password.min' => "Password must be at least 8 characters",
            'password.regex' => "Password must contain at least one uppercase, one lowercase, and one number",
            'password.confirmed' => "Passwords do not match",

            'email.required' => 'Email is required',
            'email.email' => 'Email format is invalid',
            'email.unique' => 'Email must not be used before',

            'role.required' => 'Choose a role first',
        ];
    }
}
