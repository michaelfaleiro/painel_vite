interface Props {
  type?: any;
  className?: string;
  onClick?: any;
  text: string;
}

export default function Button({ className, onClick, type, text }: Props) {
  return (
    <>
      <button
        type={type}
        className={`text-gray-100 text-sm font-medium py-2 px-2 rounded-full ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
