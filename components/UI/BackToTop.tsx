'use client'

import classNames from "classnames"
import { useEffect, useState } from "react"
import { ArrowUpIcon } from "@heroicons/react/24/outline"

const BackToTop = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 320)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label="Back to top"
            className={classNames(
                "fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-border-T10 bg-surface-T50/90 text-primary-T10 shadow-[var(--shadow-panel)] backdrop-blur transition-all md:bottom-8 md:right-8",
                visible
                    ? "pointer-events-auto translate-y-0 opacity-100 hover:-translate-y-1 hover:border-primary-T10/50 hover:bg-primary-T30"
                    : "pointer-events-none translate-y-3 opacity-0"
            )}
        >
            <ArrowUpIcon className="size-5" />
        </button>
    )
}

export default BackToTop
