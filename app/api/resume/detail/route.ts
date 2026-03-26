import { createApiRes } from "@/helpers/api"
import { getResumeDetail } from "@/libs/content"
import { IResume } from "@/types/resume"

// TODO: 把資料轉到 DB 上面
export const GET = async (_: Request) => {
    try {
        const data = await getResumeDetail()

         return createApiRes<IResume>({ data })
    } catch (error) {
        return createApiRes<null>({ error })
    }
}
