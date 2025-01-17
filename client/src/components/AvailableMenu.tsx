import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'

const AvailableMenu = () => {
  return (
    <div className='md:p-4'>
        <h1 className='text-xl md:text-2xl font-extrabold mb-6'>
            Available Manus
        </h1>
        <div className='grid md:grid-cols-3 space-y-4 md:space-y-0'>
            <Card className='max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden'>
                <img src="https://static.vecteezy.com/system/resources/previews/028/882/814/non_2x/pizza-pizza-transparent-pizza-ai-generated-free-png.png" alt=""  className='object-cover w-full h-40'/>
                <CardContent className='p-4'>
                    <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>
                        Biryani
                    </h2>
                    <p className='text-sm text-gray-600 mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, animi.</p>
                    <h3 className='text-lg font-semibold mt-4'>Price: <span className='text-[#D19254]'>
                        80₹</span></h3>
                </CardContent>
                <CardFooter className='p-4'>
                    <Button className='bg-orange w-full hover:bg-hoverOrange'>Add To Cart</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  )
}

export default AvailableMenu