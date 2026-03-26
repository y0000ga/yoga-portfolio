interface ITagProps { content: string }

const Tag = ({ content }: ITagProps) => {
    return (
        <li className="rounded-full border border-primary-T10/25 bg-primary-T30 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-primary-T20 md:px-3.5">
            {content}
        </li>
    )
}

export const Tags = ({ list }: { list: string[] }) => (
    <ul className="flex flex-wrap gap-2">
        {list.map((item) => <Tag content={item} key={item} />)}
    </ul>
)
