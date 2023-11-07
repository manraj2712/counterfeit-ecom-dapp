type Props = {
    label: string;
    type?: string;
    placeholder: string;
    state: string;
    setState: (e: string) => void;
    error: string;
    isTextArea?: boolean;
};

export default function FormFeild({
    label,
    type,
    placeholder,
    state,
    setState,
    error,
    isTextArea = false,
}: Props) {
    return (
        <div className="flexStart flex-col gap-4 w-full">
            <label className="w-full text-gray-100">
                {label}
            </label>
            {isTextArea ? (
                <textarea
                    placeholder={placeholder}
                    value={state}
                    required
                    className="form_field-input"
                    onChange={(e) => {
                        setState(e.target.value);
                    }}
                />
            ) : (
                <input
                    type={type || "text"}
                    placeholder={placeholder}
                    value={state}
                    required
                    className="form_field-input"
                    onChange={(e) => {
                        setState(e.target.value);
                    }}
                />
            )}
        </div>
    );
}