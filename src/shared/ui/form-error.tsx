import { BsExclamationCircle } from 'react-icons/bs';
interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-lg flex items-center gap-x-2 text-sm text-destructive">
      <BsExclamationCircle className="w-6 h-6" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
