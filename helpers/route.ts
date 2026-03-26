export const Route = {
    resume: {
        detail: ({ lang }: { lang: string }) => `/${lang}/resume`
    },
    project: {
        detail: ({ lang, id }: { lang: string, id: string }) => `/${lang}/project/${id}`,
        list: ({ lang }: { lang: string }) => `/${lang}/project`
    }
}