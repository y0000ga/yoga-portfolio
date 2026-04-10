interface ITagProps {
  content: string;
}

const Tag = ({ content }: ITagProps) => {
  return (
    <li className="border-primary-T10/25 bg-primary-T30 text-primary-T20 rounded-full border px-3 py-1 text-[12px] font-semibold tracking-[0.08em] uppercase md:px-3.5">
      {content}
    </li>
  );
};

export const Tags = ({ list }: { list: string[] }) => (
  <ul className="flex flex-wrap gap-2">
    {list.map((item) => (
      <Tag
        content={item}
        key={item}
      />
    ))}
  </ul>
);
