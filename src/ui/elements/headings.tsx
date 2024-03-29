// =============================================================================
// File Name: headings.tsx
// File Description:
// This file contains all the Heading React Components.
// =============================================================================
// =============================================================================
// Components Imports
// =============================================================================
import { ReactNode } from "react"

// =============================================================================
// Components Props
// =============================================================================
type HeadingProps = {
    children: ReactNode,
    styles?: string,
    level: number,
    title: string,
}

// =============================================================================
// React Components
// =============================================================================
export const Heading = ({children, styles = '', level, title}: HeadingProps) => {
    if(level === 1) return <h1 className={`font-bold text-4xl capitalize md:text-5xl lg:text-6xl ${styles}`} title={title}>{children}</h1>
    if(level === 2) return <h2 className={`font-bold text-3xl lg:text-4xl ${styles}`} title={title}>{children}</h2>
    if(level === 3) return <h3 className={`text-lg font-semibold ${styles}`} title={title}>{children}</h3>
    if(level === 4) return <h4 className={`text-md font-semibold ${styles}`} title={title}>{children}</h4>
}

export const HeadingSmall = ({children, styles = '', level, title}: HeadingProps) => {
    if(level === 1) return <h1 className={`font-bold text-3xl capitalize ${styles}`} title={title}>{children}</h1>
    if(level === 2) return <h2 className={`font-bold text-2xl ${styles}`} title={title}>{children}</h2>
}