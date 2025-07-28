import Image from 'next/image';

export function SpecialKeyIcon() {
  return (
    <div className="bg-primary-100 max-w-fit p-2 rounded-full border-solid border-8 border-primary-50">
      <Image src={'/icons/key.svg'} alt="Key" width={21} height={21} />
    </div>
  );
}

export function SpecialMailIcon() {
  return (
    <div className="bg-primary-100 max-w-fit p-2 rounded-full border-solid border-8 border-primary-50">
      <Image src={'/icons/mail-1.svg'} alt="Key" width={21} height={21} />
    </div>
  );
}

export function SpecialCloseIcon() {
  return (
    <div className="bg-error-100 max-w-fit p-2 rounded-full border-solid border-8 border-error-50">
      <Image src={'/icons/x-close.svg'} alt="Key" width={21} height={21} />
    </div>
  );
}

export function SpecialCheckCircleIcon() {
  return (
    <div className="bg-success-100 max-w-fit p-2 rounded-full border-solid border-8 border-success-50">
      <Image src={'/icons/check-circle.svg'} alt="Key" width={21} height={21} />
    </div>
  );
}
