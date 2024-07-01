
import { InputText } from 'primereact/inputtext';

interface EmailInputProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ id, value, onChange, onBlur }) => {
  return (
    <div className="flex flex-column gap-2 mt-3">
      <label htmlFor={id}><b>Email address</b></label>
      <InputText
        placeholder="email@mail.com"
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

export default EmailInput;
