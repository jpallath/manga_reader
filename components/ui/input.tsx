interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      <input
        type="text"
        className="grow"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
