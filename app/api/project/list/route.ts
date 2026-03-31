import { createApiRes } from "@/helpers/api"
import { getProjectList } from "@/libs/content"
import { IGetProjectListResData } from "@/types/api"

export const dynamic = "force-static"
export const revalidate = 3600

// TODO: 把資料轉到 DB 上面
export const GET = async (_: Request) => {
    try {
        const list = await getProjectList()

        return createApiRes<IGetProjectListResData>({
            data: { list }
        })
    } catch (error) {
        return createApiRes<null>({ error })
    }
}
