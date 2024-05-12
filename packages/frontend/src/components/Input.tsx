interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={`h-10 px-2 border text-black border-gray-300 bg-white rounded-lg focus:outline-none ${
        className ?? ""
      }`}
      {...rest}
    />
  );
}
