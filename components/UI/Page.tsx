import { PropsWithChildren } from "react"
import { AsideNav } from "./Scroll"

interface IProps { navs: Array<{ id: string, title: string }> }

export const AsidePage = ({ children, navs }: PropsWithChildren<IProps>) => {
    return <>
        <section className="flex-1 flex flex-col items-center gap-6 md:gap-10 min-w-0">
            {children}
        </section>
        <aside
            className="relative hidden w-64 shrink-0 xl:inline"
        >
            <div
                className="absolute top-0 z-50 flex w-full flex-col gap-3 rounded-2xl border border-border-T10 bg-surface-T50/90 p-3 shadow-[var(--shadow-panel)] backdrop-blur md:sticky md:top-28"
            >
                <AsideNav navs={navs} />
            </div>
        </aside>
    </>
}
