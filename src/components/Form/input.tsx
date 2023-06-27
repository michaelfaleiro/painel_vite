interface InputProps {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  label: string;
}

export function Input({ id, name, type, placeholder, label }: InputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={name} placeholder={placeholder} />
    </>
  );
}
