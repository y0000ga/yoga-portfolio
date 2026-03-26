'use client'

import Button from "@/components/UI/Button"

interface IProps {
    error: Error & { digest?: string }
    unstable_retry: () => void
}

const Error = ({
    error,
    unstable_retry,
}: IProps) => {
    console.log(error)
    return (
        <section className="flex flex-col items-center gap-4 flex-1">
            <h1>網頁錯誤</h1>
            <Button variant="primary" size="lg" onClick={() => unstable_retry()}>重新嘗試</Button>
        </section>
    )
}

export default Error