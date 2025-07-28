import { Input, InputProps } from 'antd';

export const NumberInput = (props: InputProps) => {
  return (
    <Input
      // type="number"
      // do not take e as input in number
      step="any"
      onPaste={(e) => {
        if (e.clipboardData.getData('text/plain').match(/[^\d.-]/)) {
          e.preventDefault();
        }
      }}
      // also if user types in number
      onKeyPress={(e) => {
        // allow only numbers and one dot
        if (
          e.key.match(/[^\d.]/) ||
          (e.key === '.' && e.currentTarget.value.includes('.'))
        ) {
          e.preventDefault();
        }
      }}
      {...props}
    />
  );
};
