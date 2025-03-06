import { memo, useMemo } from 'react';

import clsx from 'clsx';

import type { ButtonHTMLAttributes } from 'react';

const classes = {
	buttonBase: `
		border 
		border-primary! 
		rounded-sm 
		hover:border-primary 
		hover:bg-black! 
		px-3 
		py-1
		outline-0!
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
