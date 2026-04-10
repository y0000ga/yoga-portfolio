import { createApiRes } from "@/helpers/api";
import { getProjectById } from "@/libs/content";
import { IProject } from "@/types/project";

export const dynamic = "force-static";
export const revalidate = 3600;

interface IParams {
  id: string;
}

// TODO: 把資料轉到 DB 上面
export const GET = async (
  _: Request,
  { params }: { params: Promise<IParams> },
) => {
  try {
    const { id } = await params;
    const data = await getProjectById(id);

    if (!data) {
      return createApiRes<null>({
        error: new Error("No Project"),
        status: 404,
      });
    }

    return createApiRes<IProject>({ data });
  } catch (error) {
    return createApiRes<null>({ error });
  }
};
