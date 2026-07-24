import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({ resource }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: resource.title,
        description: resource.description || '',
        type: resource.type,
        attachment: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('resources.update', resource.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Resource: {resource.title}</h2>}>
            <Head title="Edit Resource" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <InputLabel value="Subject" />
                                <TextInput className="mt-1 block w-full bg-gray-100" value={resource.subject.name} disabled />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="type" value="Type" />
                                <select
                                    id="type"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    required
                                >
                                    <option value="DOCUMENT">Document</option>
                                    <option value="PDF">PDF</option>
                                    <option value="VIDEO">Video</option>
                                    <option value="PRESENTATION">Presentation</option>
                                    <option value="LINK">Link</option>
                                    <option value="OTHER">Other</option>
                                </select>
                                <InputError message={errors.type} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="4"
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="attachment" value="Replace Attachment (Optional)" />
                                <input
                                    type="file"
                                    id="attachment"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('attachment', e.target.files[0])}
                                />
                                {resource.file_url && <p className="text-sm text-gray-500 mt-1">Current file: {resource.file_url}</p>}
                                <InputError message={errors.attachment} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Update Resource
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
