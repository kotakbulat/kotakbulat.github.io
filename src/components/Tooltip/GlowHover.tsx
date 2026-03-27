import "./glowHover.css"

type GlowProps = {
    children: React.ReactNode
    className?: string
}


export function GlowHover({ children, className }: GlowProps) {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
    }

    return (
        <div className={`glow-hover ${className}`} onMouseMove={handleMouseMove}>
            {children}
        </div>
    )
}