import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'

function InterviewSchedule() {
    return (
        <TabsContent value='interview'>
            <div className="flex flex-col leading-relaxed max-w-[688px] px-2">
                <div className="flex flex-wrap gap-10 justify-between items-center w-full text-base max-md:max-w-full">
                    <div className="self-stretch my-auto font-semibold text-slate-800">
                        Interview List
                    </div>
                    <div className="flex gap-2.5 justify-center items-center self-stretch px-4 py-3 my-auto font-bold text-center text-indigo-600 min-w-[240px]">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/72ec0d8dd41afbe99d4b5cb91df2c15b2190671e5e605917ed2f2739f5c9ac39?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                        />
                        <div className="self-stretch my-auto">Add Schedule Interview</div>
                    </div>
                </div>
                <div className="flex flex-col mt-4 w-full">
                    <div className="flex flex-col w-full max-md:max-w-full">
                        <div className="text-sm text-slate-500">Tomorrow - 10 July, 2021</div>
                        <div className="flex flex-wrap gap-4 justify-between items-center p-4 mt-2 w-full bg-white border border-solid border-zinc-200 max-md:max-w-full">
                            <div className="flex gap-4 items-center self-stretch my-auto w-[204px]">
                                <img
                                    loading="lazy"
                                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/38331d5a49a5d55104e7e3321c96011b53a42c275725fa220c6a4901a848d5be?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/38331d5a49a5d55104e7e3321c96011b53a42c275725fa220c6a4901a848d5be?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/38331d5a49a5d55104e7e3321c96011b53a42c275725fa220c6a4901a848d5be?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/38331d5a49a5d55104e7e3321c96011b53a42c275725fa220c6a4901a848d5be?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/38331d5a49a5d55104e7e3321c96011b53a42c275725fa220c6a4901a848d5be?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/38331d5a49a5d55104e7e3321c96011b53a42c275725fa220c6a4901a848d5be?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/38331d5a49a5d55104e7e3321c96011b53a42c275725fa220c6a4901a848d5be?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/38331d5a49a5d55104e7e3321c96011b53a42c275725fa220c6a4901a848d5be?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                                    className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
                                />
                                <div className="flex flex-col self-stretch my-auto">
                                    <div className="text-base font-semibold text-slate-800">
                                        Kathryn Murphy
                                    </div>
                                    <div className="text-sm text-slate-500">Written Test</div>
                                </div>
                            </div>
                            <div className="flex flex-col self-stretch my-auto w-[189px]">
                                <div className="text-base font-medium text-slate-800">
                                    10:00 AM - 11:30 AM
                                </div>
                                <div className="text-sm text-slate-500">
                                    Silver Crysta Room, Nomad
                                </div>
                            </div>
                            <div className="flex gap-2.5 justify-center items-center self-stretch px-4 py-3 my-auto text-base font-bold text-center text-indigo-600 border border-indigo-200 border-solid">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/118c533b3f327b8a9072dde626808c96e5ed7cd5220d6966a13826bc0f21d346?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                                />
                                <div className="self-stretch my-auto">Add Feedback</div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f79d3f8d41765804183d2ddbc2a6fab5e35395687e8ce8558fd2b25391b7711?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                        <div className="text-sm text-slate-500">11 July, 2021</div>
                        <div className="flex flex-wrap gap-4 justify-between items-center p-4 mt-2 w-full bg-white border border-solid border-zinc-200 max-md:max-w-full">
                            <div className="flex gap-4 items-center self-stretch my-auto w-[204px]">
                                <img
                                    loading="lazy"
                                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/32c72a8c6c734d130b16964a2cdf464a23c7b6d1d32711d6a877cd637350df6d?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c72a8c6c734d130b16964a2cdf464a23c7b6d1d32711d6a877cd637350df6d?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c72a8c6c734d130b16964a2cdf464a23c7b6d1d32711d6a877cd637350df6d?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c72a8c6c734d130b16964a2cdf464a23c7b6d1d32711d6a877cd637350df6d?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c72a8c6c734d130b16964a2cdf464a23c7b6d1d32711d6a877cd637350df6d?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c72a8c6c734d130b16964a2cdf464a23c7b6d1d32711d6a877cd637350df6d?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c72a8c6c734d130b16964a2cdf464a23c7b6d1d32711d6a877cd637350df6d?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/32c72a8c6c734d130b16964a2cdf464a23c7b6d1d32711d6a877cd637350df6d?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                                    className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
                                />
                                <div className="flex flex-col self-stretch my-auto">
                                    <div className="text-base font-semibold text-slate-800">
                                        Jenny Wilson
                                    </div>
                                    <div className="text-sm text-slate-500">Written Test 2</div>
                                </div>
                            </div>
                            <div className="flex flex-col self-stretch my-auto w-[189px]">
                                <div className="text-base font-medium text-slate-800">
                                    10:00 AM - 11:00 AM
                                </div>
                                <div className="text-sm text-slate-500">
                                    Silver Crysta Room, Nomad
                                </div>
                            </div>
                            <div className="flex gap-2.5 justify-center items-center self-stretch px-4 py-3 my-auto text-base font-bold text-center text-indigo-600 border border-indigo-200 border-solid">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/118c533b3f327b8a9072dde626808c96e5ed7cd5220d6966a13826bc0f21d346?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                                />
                                <div className="self-stretch my-auto">Add Feedback</div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc6bdd72682bed81e4d84bbbc3da9b27c246dad56539367151e0da87a83a4737?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                        <div className="text-sm text-slate-500">12 July, 2021</div>
                        <div className="flex flex-wrap gap-4 justify-between items-center p-4 mt-2 w-full bg-white border border-solid border-zinc-200 max-md:max-w-full">
                            <div className="flex gap-4 items-center self-stretch my-auto w-[204px]">
                                <img
                                    loading="lazy"
                                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                                    className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
                                />
                                <div className="flex flex-col self-stretch my-auto">
                                    <div className="text-base font-semibold text-slate-800">
                                        Thad Eddings
                                    </div>
                                    <div className="text-sm text-slate-500">Skill Test</div>
                                </div>
                            </div>
                            <div className="flex flex-col self-stretch my-auto w-[189px]">
                                <div className="text-base font-medium text-slate-800">
                                    10:00 AM - 11:00 AM
                                </div>
                                <div className="text-sm text-slate-500">
                                    Silver Crysta Room, Nomad
                                </div>
                            </div>
                            <div className="flex gap-2.5 justify-center items-center self-stretch px-4 py-3 my-auto text-base font-bold text-center text-indigo-600 border border-indigo-200 border-solid">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a684e8d4fda3a65c8d509508cc4b196165733c62cdc9d69f4c7e1704e58cecd?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                                />
                                <div className="self-stretch my-auto">Add Feedback</div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d086b4027bfb98fdc92fb74770cd310dcb6940e8edfa8a09b1d3e51f4c7554ab?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 w-full max-md:max-w-full">
                        <div className="text-sm text-slate-500">13 July, 2021</div>
                        <div className="flex flex-wrap gap-4 justify-between items-center p-4 mt-2 w-full bg-white border border-solid border-zinc-200 max-md:max-w-full">
                            <div className="flex gap-4 items-center self-stretch my-auto w-[204px]">
                                <img
                                    loading="lazy"
                                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c2cd9ff0e5ad001a2cd305538cf75c12a8a9a54d3e107352e33b0e733cb1c9b?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                                    className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
                                />
                                <div className="flex flex-col self-stretch my-auto">
                                    <div className="text-base font-semibold text-slate-800">
                                        Thad Eddings
                                    </div>
                                    <div className="text-sm text-slate-500">Final Test</div>
                                </div>
                            </div>
                            <div className="flex flex-col self-stretch my-auto w-[189px]">
                                <div className="text-base font-medium text-slate-800">
                                    10:00 AM - 11:00 AM
                                </div>
                                <div className="text-sm text-slate-500">
                                    Silver Crysta Room, Nomad
                                </div>
                            </div>
                            <div className="flex gap-2.5 justify-center items-center self-stretch px-4 py-3 my-auto text-base font-bold text-center text-indigo-600 border border-indigo-200 border-solid">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/118c533b3f327b8a9072dde626808c96e5ed7cd5220d6966a13826bc0f21d346?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                                />
                                <div className="self-stretch my-auto">Add Feedback</div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c708ea3f78242832e1aaee2082470b3fe990500e41fc9403ca3e792cfb037d7?placeholderIfAbsent=true&apiKey=bf80438c4595450788b907771330b274"
                                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </TabsContent>
    )
}

export default InterviewSchedule


