
export function PersonalDetails({ data }: { data: any }) {
  return (
    <div>
      <h2 className='font-bold text-xl text-center'
        style={{
          color: data?.themeColor
        }}
      >
        {data?.firstName} {data?.lastName}</h2>
      <h2 className='text-center text-sm font-medium'
      >{data?.jobTitle}</h2>
      <h2 className='text-center font-normal text-xs'
        style={{
          color: data?.themeColor
        }}>{data?.address}</h2>

      <div className='flex justify-between'>
        <h2 className='font-normal text-xs'
          style={{
            color: data?.themeColor
          }}>{data?.phone}</h2>
        <h2 className='font-normal text-xs'
          style={{
            color: data?.themeColor
          }}>{data?.email}</h2>

      </div>
      <hr className='border-[1.5px] my-2'
        style={{
          borderColor: data?.themeColor
        }}
      />
    </div>
  )
}

