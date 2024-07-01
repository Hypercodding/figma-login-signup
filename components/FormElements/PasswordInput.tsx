import { Password } from 'primereact/password';

interface PasswordInputProps {
  id: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  showForgotPassword?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ id, value,name, onChange, onBlur, showForgotPassword = true }) => {
  return (
    <div className="flex flex-column gap-2 border-round-xl mt-3">
      <label htmlFor="password" className="flex align-items-center justify-content-between">
            <b>Password</b>
            {showForgotPassword && <a href="#" className="forgot-password-link" style={{fontSize: "0.7rem"}}>Forgot Password</a>}
        </label>
        <div className="border-round-xl">
      <Password
        placeholder="password"
        id={id}
        name={name}
        aria-describedby={`${id}-help`}
        className="border-round-xl"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputStyle={{borderRadius: "0.75rem", width: "100%"}} style={{borderRadius: "0.75rem", width: "100% "}}
        feedback={false}
      />
      </div>
    </div>
  );
};

export default PasswordInput;
