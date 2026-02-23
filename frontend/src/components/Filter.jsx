import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-5LPA", "5-10LPA", "10-50LPA"]
    },
];

const Filter = ({setSelectedFilter}) => {
    // handle filter by lifting the state up to parent
    const handleSelectedFilter = (type, value) => {
        setSelectedFilter((prev) => ({
            ...prev, [type.toLowerCase()]: value
        }))
    }

    return (
        <div className='w-full bg-white p-5 rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition'>

            <h1 className='font-bold text-lg text-gray-800'>Filter Jobs</h1>
            <hr className='mt-3 mb-4' />

            <div className='space-y-6'>

                {
                    filterData.map((data, idx) => (
                        <div key={idx} className='space-y-3'>

                            <span className='font-semibold text-[#6A38C2] text-sm uppercase tracking-wide '>
                            { data.filterType}
                            </span>
                            {
                                data.filterType==='Salary' &&  <span className='text-[#6A38C2] text-sm'>/month</span>
                            }

                            <RadioGroup className='mt-2' onValueChange={(value)=> handleSelectedFilter(data.filterType, value)}>
                            {
                                data.array.map((item, i) => {
                                    const id = `${data.filterType}-${i}`;
                                    return (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 p-1/2 rounded-md hover:bg-gray-100 transition cursor-pointer"
                                        >
                                            <RadioGroupItem value={item} id={id} />
                                            <Label htmlFor={id} className="text-sm text-gray-700 cursor-pointer w-full">
                                                {item}
                                            </Label>
                                        </div>
                                    )
                                })
                            }
                            </RadioGroup>

                        </div>
                    ))
                }

            </div>

        </div>


    )
}

export default Filter;