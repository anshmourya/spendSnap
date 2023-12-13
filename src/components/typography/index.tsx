import { cn } from "../../lib/util";
import { ReactNode } from "react";

interface typograph {
    children: ReactNode;
    className?: string;
}
export function H1({ children, className }: typograph) {
    return (
        <h1
            className={cn(
                "text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl",
                className
            )}
        >
            {children}
        </h1>
    );
}
export function H2({ children, className }: typograph) {
    return (
        <h2
            className={cn(
                "pb-2 text-3xl font-semibold tracking-tight scroll-m-20 first:mt-0",
                className
            )}
        >
            {children}
        </h2>
    );
}
export function H3({ children, className }: typograph) {
    return (
        <h3
            className={cn(
                "text-2xl font-semibold tracking-tight scroll-m-20",
                className
            )}
        >
            {children}
        </h3>
    );
}
export function H4({ children, className }: typograph) {
    return (
        <h4
            className={cn(
                "text-xl font-semibold tracking-tight scroll-m-20",
                className
            )}
        >
            {children}
        </h4>
    );
}
export function H5({ children, className }: typograph) {
    return (
        <h5
            className={cn(
                "text-lg font-semibold tracking-tight scroll-m-20",
                className
            )}
        >
            {children}
        </h5>
    );
}
export function P({ children, className }: typograph) {
    return <p className={cn("leading-7 ", className)}>{children}</p>;
}
export function Small({ children, className }: typograph) {
    return (
        <small className={cn("text-sm font-medium leading-none", className)}>
            {children}
        </small>
    );
}
export function Muted({ children, className }: typograph) {
    return (
        <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
    );
}

export function Blockquote({ children, className }: typograph) {
    return (
        <blockquote className={cn("pl-6 mt-6 italic border-l-2", className)}>
            {children}
        </blockquote>
    );
}
export function InlineCode({ children, className }: typograph) {
    return (
        <code
            className={cn(
                "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
                className
            )}
        >
            {children}
        </code>
    );
}