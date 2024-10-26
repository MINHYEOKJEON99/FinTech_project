'use client';
import clsx from 'clsx';
import classes from './Button.module.css';
import { useRouter } from 'next/navigation';

interface ButtonParameter {
  styles?: string;
  path?: string;
  children: string | React.ReactNode;
  type: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({
  type,
  styles,
  children,
  path = '/',
}: ButtonParameter) {
  const router = useRouter();

  const onClick: (event: React.MouseEvent<HTMLButtonElement>) => void = () => {
    if (type === 'button') {
      router.push(path);
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(classes.button, styles)}
    >
      {children}
    </button>
  );
}
