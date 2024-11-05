import React, { useCallback, useState } from 'react'
import axios from 'axios'
import _ from 'lodash';
import { IoCloseCircle } from 'react-icons/io5';

interface PasswordInputProps {
    label: string;
    name: string;
    location: any // Define the type for locations
    setLocation: React.Dispatch<React.SetStateAction<any[]>>;
}

export const LocationInput: React.FC<PasswordInputProps> = ({ label, name, location, setLocation }) => {
    const [suggestions, setSuggestions] = useState([])
    const [field,setField] = useState('')

    const handleSuggestionClick = (suggestion: any) => {
        setLocation((prevLocation) => [...prevLocation, suggestion.csc]);

    };

    const removeLocation = (data: any) => {
        setLocation(location.filter((dat:any) => dat._id != data._id))
    }

    const fetchLocation = useCallback(
        _.debounce(async (value: string) => {
            if (value.length > 3) {
                try {
                    let response:any;
                    try {
                        response = await axios.get('https://ccsapi.up.railway.app/api/v1/search-db', {
                            params: {
                                search: value,
                                limit: 20,
                                offset: 0,
                            },
                        });
                    } catch (error: any) {
                        if (error.response && error.response.status === 429) {
                            // If the first request returns a 429 error, fall back to the second URL
                            response = await axios.get('https://api.thecompaniesapi.com/v1/locations/cities', {
                                params: {
                                    search: value,
                                    limit: 10,
                                },
                            });
                        } else {
                            console.log(error) // Re-throw error if it's not a 429 error
                        }
                    }

                    setSuggestions(response.data.results || response.data.results);
                    console.log(response.data.results || response.data);
                    console.log(suggestions)
                } catch (error) {
                    console.error('Error fetching location data:', error);
                }
            } else {
                setSuggestions([]);
            }
        }, 500),
        []
    );

    async function handleSubmit() {
        await fetchLocation(field)
    }



    return (
        <>
            {
                 location?.length ?  (
                    <div className="flex gap-4 justify-between py-2 pr-4 pl-2 mt-1 w-full text-indigo-600 whitespace-nowrap bg-white border border-solid border-zinc-200 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                        <div className="flex flex-wrap gap-2">
                            {
                                location?.length && location.map((data:any) => (
                                    <div key={data} className="flex gap-2 justify-center items-center py-1 pr-1 pl-3 bg-slate-50">
                                        {data}
                                        <IoCloseCircle onClick={() => removeLocation(data)} size={20} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    null
                )
            }

            <div>
                <div>{label}</div>
                <input
                    onChange={(e) => setField(e.target.value)}
                    name={name}
                    className="justify-center items-start px-4 py-3 mt-1 whitespace-nowrap bg-white border border-solid border-zinc-200 max-md:pr-5 max-md:max-w-full"
                />
                <button type='button' onClick={handleSubmit} className='px-5 py-3 ml-2 rounded text-white font-bold bg-indigo-600'>GO</button>
                {
                    suggestions &&
                    suggestions.length > 0 && (
                        <div className='h-[130px] overflow-scroll bg-gray-100'>

                            <ul className=''>
                                {suggestions.map((suggestion:any, index) => (
                                    <li style={{ border: '1px  groove' }} onClick={() => handleSuggestionClick(suggestion)}
                                        className='border-gray-400 cursor-pointer' key={index}>{suggestion?.csc || suggestion?.code}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
            </div>

        </>
    )
}

