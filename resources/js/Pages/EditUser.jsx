import { useForm, Head, Link, usePage, router } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EditUser({ details, attributes }) {
    const { data, setData, errors, reset } = useForm(details);
    const { message } = usePage().props;

    const DataRekening = attributes.DataRekening;
    const MyBCA = attributes.MyBCA;
    const Bisnis = attributes.Bisnis;

    const handleChange = (e) => {
        const { name, type } = e.target;
        const value = type === "file" ? e.target.files[0] : e.target.value;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(
            route("rekening.update", details.id),
            {
                ...data,
                _method: "put",
            },
            {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                },
            }
        );
    };

    const renderInput = (attribute, index) => {
        const inputClass =
            attribute.type === "file" ? "col-span-2" : "col-span-1";
        switch (attribute.type) {
            case "select":
                return (
                    <div key={index} className={`mb-4 ${inputClass}`}>
                        <InputLabel
                            htmlFor={attribute.data}
                            value={attribute.header}
                        />
                        <SelectInput
                            id={attribute.data}
                            name={attribute.data}
                            value={data[attribute.data]}
                            onChange={handleChange}
                        >
                            <option value="">Pilih {attribute.header}</option>
                            {attribute.options.map((option, index) => (
                                <SelectInput.Option key={index} value={option}>
                                    {option}
                                </SelectInput.Option>
                            ))}
                        </SelectInput>
                        <InputError
                            message={errors[attribute.data]}
                            className="mt-2"
                        />
                    </div>
                );
            case "file":
                return (
                    <div key={index} className={`mb-4 ${inputClass}`}>
                        <InputLabel
                            className="p-2 w-full border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                            htmlFor={attribute.data}
                            value={attribute.header}
                        />
                        {data[attribute.data] && (
                            <img
                                src={`/storage/${data[attribute.data]}`}
                                alt={data[attribute.data].name}
                                className="sm:w-full rounded-md p-2 bg-gray-50 dark:bg-gray-700"
                            />
                        )}
                        <TextInput
                            id={attribute.data}
                            type="file"
                            name={attribute.data}
                            onChange={handleChange}
                        />
                        <InputError
                            message={errors[attribute.data]}
                            className="mt-2"
                        />
                    </div>
                );
            default:
                return (
                    <div key={index} className={`mb-4 ${inputClass}`}>
                        <InputLabel
                            htmlFor={attribute.data}
                            value={attribute.header}
                        />
                        <TextInput
                            id={attribute.data}
                            name={attribute.data}
                            type={attribute.type}
                            value={data[attribute.data]}
                            onChange={handleChange}
                            placeholder={attribute.header}
                        />
                        <InputError
                            message={errors[attribute.data]}
                            className="mt-2"
                        />
                    </div>
                );
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Data "{details.nama}"
                </h2>
            }
        >
            <Head title="Edit Data User" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 sm:my-[1rem]">
                <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <form onSubmit={handleSubmit}>
                            <h2 className="mb-6 font-bold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                                Data Rekening
                            </h2>
                            <div className="sm:grid grid-cols-2 gap-4">
                                {DataRekening.map((attribute, index) =>
                                    renderInput(attribute, index)
                                )}
                            </div>
                            <h2 className="mb-6 font-bold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                                My BCA
                            </h2>
                            <div className="sm:grid grid-cols-2 gap-4">
                                {MyBCA.map((attribute, index) =>
                                    renderInput(attribute, index)
                                )}
                            </div>
                            <h2 className="mb-6 font-bold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                                Bisnis
                            </h2>
                            <div className="sm:grid grid-cols-4 gap-4">
                                {Bisnis.map((attribute, index) =>
                                    renderInput(attribute, index)
                                )}
                            </div>
                            <div className="flex pt-4 mt-4 gap-2 border-t-2 border-slate-600">
                                <PrimaryButton type="submit">
                                    Simpan Perubahan
                                </PrimaryButton>
                                <Link
                                    href={route("rekening.index")}
                                    as="button"
                                    type="button"
                                >
                                    <SecondaryButton>Batal</SecondaryButton>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
