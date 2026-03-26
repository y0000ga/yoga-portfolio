const HighlightText = ({ text }: { text: string }) => {
    const parts = text.split(/(".*?")/g)

    const nodes = parts.map((part, i) => {
        if (part.startsWith('"') && part.endsWith('"')) {
            const content = part.slice(1, -1);
            return <strong key={i} className="text-primary-T10">{content}</strong>;
        }

        return part;
    });

    return nodes
}

export default HighlightText