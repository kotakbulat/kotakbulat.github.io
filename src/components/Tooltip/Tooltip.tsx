import type { ReactNode } from "react";
import "./Tooltip.css"

type TooltipProps = {
    text: string;
    children: ReactNode;
}


function Tooltip({ text, children }: TooltipProps) {
    return (
        <div className="tooltip-container">
            {children}
            <span className="tooltip-text">{text}</span>
        </div>
    )
}

export default Tooltip;