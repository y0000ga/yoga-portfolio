'use client'

import classNames from "classnames"
import { PropsWithChildren, useEffect, useState } from "react"

type TNav = {
    id: string
    title: string
}

export const ScrollNav = ({ targetId, children, active = false }: PropsWithChildren<{ targetId?: string, active?: boolean }>) => {

    const handleClick = () => {
        if (!targetId) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
            return
        }
        const el = document.getElementById(targetId)

        if (!el) return

        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <button
            type="button"
            className={classNames("group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-text-T20 transition-all hover:bg-primary-T30 hover:text-text-T10", {
                "bg-primary-T30 text-primary-T10 shadow-[var(--shadow-glow)]": active
            })}
            onClick={handleClick}
        >
            <span className={classNames("h-2 w-2 rounded-full border border-primary-T10/60 bg-transparent transition-all", {
                "bg-primary-T10 shadow-[0_0_16px_hsl(188_100%_62%_/_0.8)]": active
            })} />
            {children}
        </button>
    )
}

export const AsideNav = ({ navs }: { navs: TNav[] }) => {
    const [activeId, setActiveId] = useState<string | null>(navs[0]?.id ?? null)

    useEffect(() => {
        if (navs.length === 0) return

        const updateActiveId = () => {
            const nextActiveId = navs.reduce<{ id: string | null, distance: number }>((closest, { id }) => {
                const element = document.getElementById(id)

                if (!element) return closest

                const top = element.getBoundingClientRect().top
                const distance = top <= 160 ? 160 - top : top - 160

                if (closest.id === null) {
                    return { id, distance }
                }

                return distance < closest.distance ? { id, distance } : closest
            }, { id: null, distance: Number.POSITIVE_INFINITY }).id

            if (nextActiveId) {
                setActiveId(nextActiveId)
            }
        }

        updateActiveId()
        window.addEventListener('scroll', updateActiveId, { passive: true })
        window.addEventListener('resize', updateActiveId)

        return () => {
            window.removeEventListener('scroll', updateActiveId)
            window.removeEventListener('resize', updateActiveId)
        }
    }, [navs])

    return (
        <div className="flex flex-col gap-1">
            {navs.map(({ id, title }) => (
                <ScrollNav key={id} targetId={id} active={activeId === id}>
                    {title}
                </ScrollNav>
            ))}
        </div>
    )
}
