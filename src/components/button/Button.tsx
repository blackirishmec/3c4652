import { memo, useMemo } from 'react';

import clsx from 'clsx';

import type { ButtonHTMLAttributes } from 'react';

const classes = {
	buttonBase: `
		hover:bg-gray-200
		outline-0!
		cursor-pointer
	`,
	buttonDisabled: `
		disabled:opacity-50 
		disabled:cursor-not-allowed! 
		disabled:bg-transparent!
	`,
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	type?: 'button' | 'submit' | 'reset' | undefined;
}

function ButtonBase({
	className = '',
	type = 'button',
	disabled,
	children,
	...props
}: ButtonProps) {
	const buttonClassName = useMemo(
		() => clsx(classes.buttonBase, classes.buttonDisabled, className),
		[className],
	);

	return (
		<button
			className={buttonClassName}
			// eslint-disable-next-line react/button-has-type
			type={type}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
}

const Button = memo(ButtonBase) as typeof ButtonBase;

export default Button;
