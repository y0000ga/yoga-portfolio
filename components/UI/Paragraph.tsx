import { PropsWithChildren } from "react"

interface IProps {
    title: string,
    id?: string
}

const Paragraph = ({ title, children, id }: PropsWithChildren<IProps>) => {
    return (
        <article
            className="flex w-full scroll-mt-24 flex-col gap-4 rounded-[28px] border border-border-T10 bg-surface-T50/75 px-4 py-5 shadow-[var(--shadow-panel)] backdrop-blur md:scroll-mt-32 md:gap-6 md:px-7 md:py-7"
            id={id}
        >
            <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-linear-to-r from-primary-T10/70 to-transparent" />
                <h3 className="shrink-0 text-primary-T10">{title}</h3>
                <span className="h-px flex-1 bg-linear-to-l from-primary-T10/70 to-transparent" />
            </div>
            <ul className="flex w-full flex-col gap-3 leading-loose md:gap-4">
                {children}
            </ul>
        </article>
    )
}

export default Paragraph
