import { Lang } from "@/types/common";

export const Route = {
    resume: {
        detail: ({ lang }: { lang: Lang }) => `/${lang}/resume`
    },
    project: {
        detail: ({ lang, id }: { lang: Lang, id: string }) => `/${lang}/project/${id}`,
        list: ({ lang }: { lang: Lang }) => `/${lang}/project`
    }
}