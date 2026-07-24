import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col justify-center items-center p-4 font-sans text-gray-900">
            <Head title="EduPulse LMS - Register" />

            <div className="w-full max-w-md">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 tracking-tight">
                            EduPulse <span className="text-sky-600 text-sm font-semibold">LMS</span>
                        </span>
                    </Link>
                    <p className="text-sm text-gray-500 mt-2">Create your learning account</p>
                </div>

                {/* Register Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
                    <form onSubmit={submit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                placeholder="John Doe"
                                autoComplete="name"
                                autoFocus
                                required
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                            />
                            <InputError message={errors.name} className="mt-1.5" />
                        </div>

                        {/* Email Address */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="name@edupulse.edu"
                                autoComplete="username"
                                required
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                            />
                            <InputError message={errors.email} className="mt-1.5" />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    placeholder="••••••••••••"
                                    autoComplete="new-password"
                                    required
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 015.682 1.933m4.05 4.05c1.17 1.254 2.016 2.766 2.45 4.417-1.275 4.057-5.065 7-9.542 7-1.127 0-2.204-.187-3.21-.527M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1.5" />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    placeholder="••••••••••••"
                                    autoComplete="new-password"
                                    required
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 015.682 1.933m4.05 4.05c1.17 1.254 2.016 2.766 2.45 4.417-1.275 4.057-5.065 7-9.542 7-1.127 0-2.204-.187-3.21-.527M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-1.5" />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2.5 px-4 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Registering...' : 'Register'}
                        </button>
                    </form>

                    {/* Footer link */}
                    <div className="mt-6 text-center text-sm text-gray-600 border-t border-gray-100 pt-4">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            className="font-medium text-sky-600 hover:text-sky-700"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
