import { TApiResponse } from "@/types/api"

interface ICreateApiResParams<U> { error?: unknown, data?: U, status?: number}

// TODO: 先用 function 代替，之後應改為 可 chain 執行的 class
// TODO: custom Error
export const createApiRes = <U>({
    error,
    data,
    status
}: ICreateApiResParams<U>): Response => {

    let customError: unknown = null
    let success: boolean = false
    let customData: U | null = null
    let customStatus = 404

    if (error && !data) {
        customError = error
        success = false
        customStatus =  status || 404
    }

    if (!error && data) {
        customError = null
        success = true
        customData = data
        customStatus = 200
    }

    const res = {
        error: customError,
        data: customData,
        success
    } as TApiResponse<U>

    return Response.json(res, {
        status: customStatus
    })
}