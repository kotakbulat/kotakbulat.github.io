import "./glowHover.css"

type GlowProps = {
    children: React.ReactNode
    className?: string
}


export function GlowHover({ children, className }: GlowProps) {

    const updatePosition = (el: HTMLDivElement, clientX: number, clientY: number) => {
        const rect = el.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        updatePosition(e.currentTarget, e.clientX,  e.clientY);
    }

    const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
        updatePosition(e.currentTarget, e.clientX, e.clientY);
    }


    return (
        <div 
            className={`glow-hover ${className}`} 
            onMouseMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            >
            {children}
        </div>
    )
}