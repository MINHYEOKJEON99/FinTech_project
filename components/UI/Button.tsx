'use client';
import clsx from 'clsx';
import classes from './Button.module.css';
import { useRouter } from 'next/navigation';

interface ButtonParameter {
  styles?: string;
  children: string | React.ReactNode;
  onClickHandler?: () => void;
  path?: string;
  type: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({
  type,
  styles,
  children,
  onClickHandler,
}: ButtonParameter) {
  return (
    <button
      type={type}
      onClick={onClickHandler}
      className={clsx(classes.button, styles)}
    >
      {children}
    </button>
  );
}
