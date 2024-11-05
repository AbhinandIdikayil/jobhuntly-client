import React from 'react'
import _ from 'lodash';

interface Techstack {
    label: string;
    name: string;
    stacks: any // Define the type for locations
    setStacks: React.Dispatch<React.SetStateAction<any[]>>;
}
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IoCloseCircle } from 'react-icons/io5';
import fonts from '../../assets/techstacks.json'

export const TechStackInput: React.FC<Techstack> = ({ label, name, stacks, setStacks }) => {

    function handleClick(data: any) {
        setStacks((prev) => [...prev, data.name])
    }

    function handleRemove(data: any) {
        setStacks(stacks.filter((val: any) => val != data))
    }

    return (
        <>
            <Command className="rounded-lg border shadow-md">
                <CommandInput aria-label={label} name={name} onValueChange={() => console.log('sdsdf')} placeholder="Type a command or search..." />
                <CommandList >
                    <CommandEmpty>No results found.</CommandEmpty>
                    <ScrollArea className='h-36' onClick={() => console.log('afaf')}>
                        <CommandGroup heading="Suggestions">
                            {
                                fonts.map((data,i) => (
                                    <div key={i} className='flex justify-center items-center' onClick={() => handleClick(data)}>
                                        <CommandItem  className='w-full border-2'>
                                            <picture>
                                                <source
                                                    media="(prefers-color-scheme: light)"
                                                    srcSet={`https://deviconapi.vercel.app/${data.name}?theme=light&size=50`} />
                                                {/* <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${data.name}/${data.name}-original.svg?size=10`} /> */}

                                                <img src={`https://deviconapi.vercel.app/${data.name}?theme=lig&size=50`} />
                                            </picture>
                                            <span>{data.name}</span>
                                        </CommandItem>
                                    </div>
                                ))
                            }
                        </CommandGroup>
                    </ScrollArea>
                    <CommandSeparator />
                </CommandList>
            </Command>
            <div className="flex gap-4 justify-between py-2 pr-4 pl-2 mt-1 w-full text-indigo-600 bg-white border border-solid border-zinc-200 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                <div className="flex flex-wrap gap-2">
                    {
                        stacks?.length > 0 && stacks?.map((val: any) => (
                            <div className="flex gap-2 items-center justify-center py-1 pr-1 pl-3 bg-slate-50">
                                <div>{val}</div>
                                <IoCloseCircle onClick={() => handleRemove(val)} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default TechStackInput





