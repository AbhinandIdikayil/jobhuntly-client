import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

function SectoresAccordian({handleCategory}:{handleCategory:(e:any,id:string) => void}) {
    const categoryState = useSelector((state: RootState) => state.category)
    return (
        <AccordionItem className='mt-1 rounded-2xl border border-zinc-200 bg-white shadow-sm px-2 text-sm text-black' value="category">
            <AccordionTrigger className='font-semibold text-slate-800'>Categories</AccordionTrigger>
            <AccordionContent className='pb-2'>
                {
                    categoryState?.sectors?.map((data,ind) => (
                        <div key={data?.name + ind} onClick={(e) => handleCategory(e, data?._id)}
                            className='flex flex-wrap gap-2 items-center justify-start mb-2 rounded-xl px-2 py-2 hover:bg-indigo-50/60 transition-colors'>
                            <Checkbox id="terms2" className='border-zinc-300 text-indigo-600' />
                            <label
                                htmlFor="terms2"
                                className="text-sm font-medium leading-none text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {data?.name}
                            </label>
                        </div>
                    ))
                }
            </AccordionContent>
        </AccordionItem>
    )
}

export default SectoresAccordian
