import { useForm, Head, Link, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function TambahDataUser({ attributes }) {
    const { data, setData, post, errors, processing, reset } = useForm({});
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
        post(route("rekening.store"), data, {
            forceFormData: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const renderInput = (attribute, index) => {
        const inputClass =
            attribute.type === "file" ? "col-span-4" : "col-span-1";
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
                            value={data[attribute.data]} // Pastikan ini diatur
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
                    <div class key={index} className={`mb-4 ${inputClass}`}>
                        <InputLabel
                            htmlFor={attribute.data}
                            value={attribute.header}
                        />
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
                    <div class key={index} className={`mb-4 ${inputClass}`}>
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
                    Tambah Data User
                </h2>
            }
        >
            <Head title="Tambah Data User" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 sm:my-[1rem]">
                <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg transition-all">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <form onSubmit={handleSubmit}>
                            <h2 className="mb-6 font-bold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                                Data Rekening
                            </h2>
                            <div className="sm:grid grid-cols-2 gap-4">
                                {DataRekening.map((attribute, index) => {
                                    return renderInput(attribute, index);
                                })}
                            </div>
                            <h2 className="mb-6 font-bold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                                My BCA
                            </h2>
                            <div className="sm:grid grid-cols-2 gap-4">
                                {MyBCA.map((attribute, index) => {
                                    return renderInput(attribute, index);
                                })}
                            </div>
                            <h2 className="mb-6 font-bold text-2xl text-gray-800 dark:text-gray-200 leading-tight">
                                Bisnis
                            </h2>
                            <div className="sm:grid grid-cols-4 gap-4">
                                {Bisnis.map((attribute, index) => {
                                    return renderInput(attribute, index);
                                })}
                            </div>
                            <div className="flex pt-4 mt-4 gap-2 border-t-2 border-slate-600">
                                <PrimaryButton
                                    disabled={processing}
                                    type="submit"
                                >
                                    Simpan
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
