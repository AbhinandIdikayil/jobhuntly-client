import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

function CategoryAccordian({handleEmployment}:{handleEmployment:(e:any,id:string) => void}) {
    const categoryState = useSelector((state:RootState) => state.category)
    return (
        <AccordionItem value="item-1" className='mt-1 rounded-2xl border border-zinc-200 bg-white shadow-sm px-2'>
            <AccordionTrigger className='text-sm font-semibold text-slate-800'>Types Of Employment</AccordionTrigger>
            <AccordionContent className='pb-2'>
                {
                    categoryState.category?.map(data => (
                        <div key={data?._id} onClick={(e) => handleEmployment(e, data?._id)} className='flex flex-wrap gap-2 items-center justify-start mb-2 rounded-xl px-2 py-2 hover:bg-indigo-50/60 transition-colors'>
                            <Checkbox id="terms2" className='border-zinc-300 text-indigo-600' />
                            <label
                                htmlFor="terms2"
                                className="text-sm text-slate-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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

export default CategoryAccordian
