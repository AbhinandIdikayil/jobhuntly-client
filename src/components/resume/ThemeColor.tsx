import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LayoutGrid } from 'lucide-react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { UseResumeContext } from 'src/context/ResumeContext';

function ThemeColor() {
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF",
        "#000000", "#808080"
    ]

    const { resume, setResume } = UseResumeContext();
    const [selectedColor, setSelectedColor] = useState<string>();
    const onColorSelect = (color: string) => {
        setSelectedColor(color)
        setResume({
            ...resume,
            themeColor: color
        });
        toast('Theme Color Updated')
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm"
                    className="flex gap-2" > <LayoutGrid /> Theme</Button>
            </PopoverTrigger>
            <PopoverContent>
                <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
                <div className='grid grid-cols-5 gap-3'>
                    {colors.map((item) => (
                        <div
                            key={item}
                            onClick={() => onColorSelect(item)}
                            className={`h-5 w-5 rounded-full cursor-pointer
             hover:border-black border
             ${selectedColor == item && 'border border-black'}
             `}
                            style={{
                                background: item
                            }}>

                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ThemeColor