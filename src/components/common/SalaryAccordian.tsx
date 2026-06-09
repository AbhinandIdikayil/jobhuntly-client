import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { CircleChevronRight } from 'lucide-react'
import { formatSalary } from 'src/utils/formatSalary'

function SalaryAccordian({ handleSalary, setMinSalary, setMaxSalary, minSalary, handleInputSalary }: { handleSalary: (e: any, data: any) => void, setMinSalary: any, setMaxSalary: any, minSalary: number | undefined, handleInputSalary: (d: any) => void }) {
    let salary = [[100000, 300000], [300000, 600000],
    [600000, 1200000], [1200000, 2350000]]
    return (
        <AccordionItem className='mt-1 rounded-2xl border border-zinc-200 bg-white px-2 text-sm text-black shadow-sm' value="item-4">
            <AccordionTrigger className='font-semibold text-slate-800'>Salary Range</AccordionTrigger>
            <AccordionContent className='pb-2'>
                <div className='flex gap-2 items-center justify-start mb-3'>
                    <input type="number"
                        onInput={(e: any) => {
                            const value = Math.max(0, parseInt(e.target.value) || 0); // Ensure the value is non-negative
                            e.target.value = value.toString(); // Update the input value to be non-negative
                        }}
                        onChange={(e) => setMinSalary(parseInt(e.target.value))} className='h-10 w-5/12 rounded-xl border border-zinc-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white' min={0} max={10000000} />
                    <input type="number"
                        onInput={(e: any) => {
                            let value = Math.max(0, parseInt(e.target.value) || 0); // Ensure the value is non-negative
                            if(!minSalary) return
                            if (value < minSalary) {
                                value = minSalary; // If value is less than minSalary, reset it to minSalary
                            }
                            setMaxSalary(value);
                            e.target.value = value.toString(); // Update the input value to the validated non-negative number
                        }}
                        onChange={(e) => setMaxSalary(parseInt(e.target.value))} className='h-10 w-5/12 rounded-xl border border-zinc-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white' min={0} max={10000000} />
                    <CircleChevronRight onClick={handleInputSalary} className='text-indigo-600 transition hover:text-indigo-700 cursor-pointer' />
                </div>
                {

                    salary?.map((data, ind: number) => (
                        <div key={ind} className='flex flex-wrap gap-2 items-center justify-start mb-2 rounded-xl px-2 py-2 hover:bg-indigo-50/60 transition-colors'>
                            <Checkbox id="terms2" onClick={(e) => handleSalary(e, data)} className='border-zinc-300 text-indigo-600' />
                            <label
                                htmlFor="terms2"
                                className="text-sm font-medium leading-none text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {formatSalary(data[0], data[1])}
                            </label>
                        </div>
                    ))
                }

            </AccordionContent>
        </AccordionItem>
    )
}

export default SalaryAccordian
