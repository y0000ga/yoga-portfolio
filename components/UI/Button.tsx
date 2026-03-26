import classNames from "classnames";
import { ComponentProps } from "react";

interface IProps extends ComponentProps<'button'> {
    variant: 'primary' | 'secondary' | 'inverted' | 'outlined',
    size: 'sm' | 'md' | 'lg'
}
const Button = ({ variant, size, type, disabled, ...props }: IProps) => {
    return <button
        type={type ?? 'button'}
        disabled={disabled}
        {...props}
        className={
            classNames(props.className,
                'w-full rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:w-3/4',
                {
                    'py-1 px-2 text-[12px] md:px-3 md:py-2 md:text-[16px] font-semibold': size === 'sm',
                    'py-2.5 px-4 md:py-5 md:px-8 text-[14px] md:text-[28px] font-bold max-w-150': size === 'lg',
                    'py-1.5 px-3 md:py-3 md:px-4 text-[10px] md:text-[20px] font-bold': size === 'md'
                },
                {
                    'cursor-pointer bg-primary-T10 text-surface-T30': variant === 'primary',
                    'cursor-pointer bg-surface-T30 text-text-T10': variant === 'secondary',
                    'cursor-pointer bg-surface-T40 text-primary-T10': variant === 'inverted',
                    'cursor-pointer border border-primary-T10 bg-transparent text-primary-T10': variant === 'outlined'
                })
        }
    />
}

export default Button
