
function SummarPreview({ data }: { data: any }) {
    return (
        <p className='text-xs'>
            {data?.summery}
        </p>
    )
}

export default SummarPreview