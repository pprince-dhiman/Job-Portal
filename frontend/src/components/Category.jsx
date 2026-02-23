import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/features/jobSlice'

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "AI Engineer",
    "Data Scientist",
    "Data Analyst",
    "Graphic Designer",
    "Video Editor"
]

const Category = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    }

    return (
        <div className='px-4'>
            <Carousel className='w-full max-w-4xl mx-auto my-16'>
                <CarouselContent>
                    {
                        categories.map((category, index) => (
                            <CarouselItem key={index} className='basis-1/2 sm:basis-1/3 md:basis-1/4'>
                                <Button onClick={()=> searchJobHandler(category)}  
                                    variant='outline'
                                    className='w-full rounded-full hover:bg-[#6A38C2] hover:text-white transition-all duration-300 hover:scale-103'
                                >
                                    {category}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className='hidden sm:flex' />
                <CarouselNext className='hidden sm:flex' />
            </Carousel>
        </div>
    )
}

export default Category;