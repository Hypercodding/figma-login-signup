import { InputText } from 'primereact/inputtext';

interface NameInputProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const NameInput: React.FC<NameInputProps> = ({ id, value, onChange, onBlur }) => {
  return (
    <div className="flex flex-column gap-2 mt-3">
      <label htmlFor={id}><b>Name</b></label>
      <InputText
        placeholder="Name"
        id={id}
        aria-describedby={`${id}-help`}
        className="border-round-xl"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default NameInput; // Ensure it's exported as default
