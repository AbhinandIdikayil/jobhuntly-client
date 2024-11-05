import { Field, Form, Formik } from 'formik';
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AppDispatch } from 'src/redux/store';
import { IAddSector } from 'src/types/Admin';
import { prop } from 'src/types/AllTypes';
import { uploadToCloudinary } from 'src/utils/common/cloudinaryUpload';
import { addSectorValidationSchema } from 'src/validation/admin';
import { openEditor } from 'react-profile'
import { addSector } from 'src/redux/actions/commonAction';
import { toast } from 'react-toastify';


function AddSectors() {

    const context = useOutletContext<prop>() || {};
    const { open } = context;
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState<string | undefined>(undefined);

    let addSectorsInitialValues: Omit<IAddSector, 'image'> = {
        name: ''
    }


    async function convertToWhiteOpaque(imageSrc: string): Promise<string> {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                if (!ctx) {
                    return null
                }
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    if (data[i + 3] < 255) { // If alpha is not fully opaque
                        data[i] = 255;     // Red channel
                        data[i + 1] = 255; // Green channel
                        data[i + 2] = 255; // Blue channel
                        data[i + 3] = 255; // Alpha channel
                    }
                }

                ctx.putImageData(imageData, 0, 0);

                const jpegDataUrl = canvas.toDataURL('image/jpeg', 1.0);
                resolve(jpegDataUrl);
            };

            img.src = imageSrc;
        });
    }

    async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const imageSrc = event.target?.result as string;
                if (imageSrc) {
                    const dataUrl = await convertToWhiteOpaque(imageSrc);
                    const image = await openEditor({ src: dataUrl });
                    if (image && image?.editedImage) {
                        let url = image?.editedImage?.getDataURL()
                        if (!url) {
                            return toast.error('Couldnt edit image', { position: 'top-center' })
                        }
                        const dataUrl = await convertToWhiteOpaque(url)
                        setImage(dataUrl); // Call the function to get the URL and then set it
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    }
    console.log(image)
    async function handleSubmit(values: IAddSector, helpers: any) {
        const { setSubmitting, setFieldError } = helpers
        if (!image) {
            setFieldError('image', 'Image is required')
            setSubmitting(false);
            return

        }
        const imageUrl = await uploadToCloudinary(image)
        let data = {
            ...values,
            image: imageUrl
        }
        try {
            const res = await dispatch(addSector(data)).unwrap()
            if (res) {
                navigate('/admin/home/sector')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`flex flex-col ml-2 ${open ? 'w-5/6' : 'w-full'}max-md:ml-0 px-0 sm:px-10 py-5 max-md:w-full text-zinc-800 `}>
            <Formik
                initialValues={addSectorsInitialValues}
                validationSchema={addSectorValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, isSubmitting }) => (
                    <Form>

                        <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center '>
                            <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                <span className='font-bold text-xl'>Category name</span>
                            </div>
                            <div className='w-full sm:w-1/2 flex flex-col items-start'>
                                <span className='text-red-600'>
                                    {
                                        errors?.name && (
                                            errors?.name
                                        )
                                    }
                                </span>
                                <Field name='name' type="text" className='w-full border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2' />
                                <span className='font-sans'>atleast 50 character</span>
                            </div>
                        </div>
                        <hr />
                        <div className='w-full flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mt-5'>
                            <div className='w-1/2 flex flex-col items-start'>
                                <span className='font-bold text-xl'>Upload image</span>
                            </div>
                            <div className='w-1/2 flex flex-col items-start'>
                                <span className='text-red-600'>
                                    {typeof errors?.image === 'string' && errors?.image}
                                </span>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className='border border-solid border-zinc-200 focus:border-zinc-500 focus:outline-none p-2'
                                />
                                <span className='font-sans'>atleast 50 character</span>
                            </div>
                        </div>
                        <hr />
                        <div className='w-full flex sm:justify-end mt-5'>
                            <div className='w-1/2 flex flex-col items-start'>
                                {
                                    image && (
                                        <img src={image} alt="jhk" className='w-80 h-72 bg-transparent ' />
                                    )
                                }
                            </div>
                        </div>
                        <button type='submit' disabled={isSubmitting} className='hover:cursor-pointer mt-2 py-2 px-2 bg-indigo-600 sm:w-1/3 text-white font-bold'>
                            save
                        </button>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default AddSectors