import { createApiRes } from "@/helpers/api"
import { getResumeOverview } from "@/libs/content"
import { TResumeOverview } from "@/types/resume"

export const dynamic = "force-static"
export const revalidate = 3600

// TODO: 把資料轉到 DB 上面
export const GET = async (_: Request) => {
    try {
        const data = await getResumeOverview()

        return createApiRes<TResumeOverview>({ data })
    } catch (error) {
        return createApiRes<null>({ error })
    }
}
