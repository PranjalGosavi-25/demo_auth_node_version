import { Typography } from 'antd';

interface IFormFieldProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  errorMessage?: string;
}

export const FormField = (props: IFormFieldProps) => {
  const { title, description, children, errorMessage } = props;

  return (
    <div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <p className="text-gray-700 text-sm font-medium">{title}</p>
        </div>

        {children}

        {description && (
          <p className="text-gray-600 text-sm font-normal">{description}</p>
        )}
      </div>
      {errorMessage && (
        <Typography className="text-xs text-error-500 pt-0.5">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};
