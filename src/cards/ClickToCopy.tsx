import React, { PropsWithChildren } from "react";
import { Popover } from "@blueprintjs/core";

export interface ClickToCopyProps {
    copyText?: string
}

export default function ClickToCopy({ copyText, children }: PropsWithChildren<ClickToCopyProps>) {
    return (
        <Popover
        position="bottom"
        usePortal={true}
        targetProps={{
            onClick: () => copyText && navigator.clipboard.writeText(copyText)
        }}
        className="masonry-item"
        fill>
            {children}
            <div style={{padding: 8}}>Copied to clipboard!</div>
        </Popover>
    )
    
}