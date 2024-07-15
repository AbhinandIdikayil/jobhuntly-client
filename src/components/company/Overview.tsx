import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import TypeDate from '../common/TypeDate'
import { LocationInput } from '../common/LocationInput'
import { companyProfile, companyProfileInitialState } from '../../validation/company/index'
import TechStackInput from '../common/TechStackInput'

function Overview() {

    const [locations, setLocation] = useState<any[]>([]);
    const [stacks, setStacks] = useState<any[]>([]);

    function handleSubmit() {

    }
    return (
        <div className="flex flex-col justify-center p-3 w-full bg-white max-md:px-5 max-md:max-w-full">
            <div className="self-start text-lg font-semibold leading-7 text-slate-800 max-md:max-w-full">
                Basic Information
            </div>
            <div className="self-start mt-1 text-base leading-6 text-slate-500 max-md:max-w-full">
                This is company information that you can update anytime.
            </div>
            <div className="mt-12 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col text-base leading-7 max-md:mt-10">
                            <div className="font-semibold text-slate-800">Company Logo</div>
                            <div className="mt-1 text-slate-500">
                                This image will be shown publicly as company logo.
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
                        <div className="grow max-md:mt-10 max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/11820a214d8cab5f08595f3c6ad821268446b30b28cb1402f29c4119bd72b8ff?apiKey=bf80438c4595450788b907771330b274&"
                                        className="shrink-0 max-w-full aspect-square w-[124px] max-md:mt-8"
                                    />
                                </div>
                                <div className="flex flex-col ml-5 w-4/5 max-md:ml-0 max-md:w-full">
                                    <div className="flex flex-col grow px-11 py-6 w-full text-base leading-6 rounded-lg border-2 border-indigo-600 border-dashed bg-slate-50 max-md:px-5 max-md:mt-8 max-md:max-w-full">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/776b59e6aed4d611c0a3f2a07b852243f43e5aa92384ed3f583b9ce65bbaa19c?apiKey=bf80438c4595450788b907771330b274&"
                                            className="self-center w-8 aspect-square"
                                        />
                                        <div className="mx-5 mt-2 text-slate-600 max-md:mx-2.5">
                                            <span className="font-medium text-indigo-600">
                                                Click to replace
                                            </span>{" "}
                                            <span className="text-slate-600">or drag and drop</span>
                                        </div>
                                        <div className="mt-1 text-slate-500">
                                            SVG, PNG, JPG or GIF (max. 400 x 400px)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col text-base leading-7 max-md:mt-10">
                            <div className="font-semibold text-slate-800">
                                Company Details
                            </div>
                            <div className="mt-1 text-slate-500">
                                Introduce your company core info quickly to users by fill up
                                company details
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
                        <Formik
                            initialValues={companyProfileInitialState}
                            onSubmit={handleSubmit}
                            validationSchema={companyProfile}
                        >
                            {
                                () => (
                                    <Form>
                                        <div className="flex flex-col grow text-base leading-6 text-slate-600 max-md:mt-10 max-md:max-w-full">
                                            <div className="font-semibold max-md:max-w-full">
                                                Company Name
                                            </div>
                                            <Field name='name' className="justify-center items-start px-4 py-3 mt-1 whitespace-nowrap bg-white border border-solid border-zinc-200 max-md:pr-5 max-md:max-w-full" />
                                            <div className="mt-6 font-semibold max-md:max-w-full">
                                                Website
                                            </div>
                                            <Field name='website' className="justify-center items-start px-4 py-3 mt-1 whitespace-nowrap bg-white border border-solid border-zinc-200 max-md:pr-5 max-md:max-w-full" />


                                            <LocationInput label='location' name='location' location={locations} setLocation={setLocation} />



                                            <div className="flex gap-5 justify-between mt-6 max-md:flex-wrap">
                                                <div className="flex flex-col">
                                                    <div className="font-semibold">Employee</div>
                                                    <div className="flex gap-4 justify-between px-4 py-3 mt-1 bg-white border border-solid border-zinc-200 max-md:pr-5">
                                                        <div>1 - 50</div>
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c2cbc77a9e47cd5264c4cb39f8e4e24c8f7f5c131a37388012a72e9cc92af6f?apiKey=bf80438c4595450788b907771330b274&"
                                                            className="shrink-0 my-auto w-5 aspect-square"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col whitespace-nowrap">
                                                    <div className="font-semibold">Industry</div>
                                                    <div className="flex gap-4 justify-between px-4 py-3 mt-1 bg-white border border-solid border-zinc-200 max-md:pr-5">
                                                        <select name="" id="" className='w-[110px]'>
                                                            <option>Technology</option>
                                                            <option>Technology</option>
                                                            <option>Technology</option>
                                                            <option>Technology</option>
                                                            <option>Technology</option>
                                                            <option>Technology</option>
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* <TypeDate label='founded-date' date='date' /> */}

                                            <div className="mt-6 font-semibold max-md:max-w-full">
                                                Tech Stack
                                            </div>
                                            <TechStackInput label='stack' name='stack' stacks={stacks} setStacks={setStacks} />

                                            <div className="text-base font-semibold leading-6 text-slate-600 max-md:max-w-full">
                                                Description
                                            </div>
                                            <Field type='textarea' cols='30'
                                                as='textarea'
                                                rows='5' name='description'
                                                label='description'
                                                className="justify-center items-start px-4 py-3 mt-1 whitespace-nowrap bg-white border border-solid border-zinc-200 max-md:pr-5 max-md:max-w-full"
                                            />
                                        </div>
                                        <div className="justify-center self-end px-10 py-3.5 mt-12 text-lg font-bold leading-7 text-center text-white bg-indigo-600 max-md:px-5 max-md:mt-10">
                                            Save Changes
                                        </div>
                                    </Form>
                                )
                            }

                        </Formik>
                    </div>
                </div>
            </div>
            <div className="mt-12 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[28%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col text-base leading-7 max-md:mt-10">
                            <div className="font-semibold text-slate-800">
                                About Company
                            </div>
                            <div className="mt-1 text-slate-500">
                                Brief description for your company. URLs are hyperlinked.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Overview