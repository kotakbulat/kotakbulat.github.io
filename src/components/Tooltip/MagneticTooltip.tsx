import "./magneticTooltip.css"
import { useRef, useState } from "react"


type MagneticTooltipProps = {
    text: string
    children: React.ReactNode
}


function MagneticTooltip({ text, children }: MagneticTooltipProps) {

    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setPosition({ x, y });
    }

    return (
        <div
            ref={ref}
            className="magnetic-container"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}    
        >
            {children}

            {visible && (
                <div
                    className="magnetic-tooltip"
                    style={{
                        left: position.x,
                        top: position.y
                    }}
                >
                    {text}
                </div>    
            )}

        </div>
    )
}

export default MagneticTooltip;