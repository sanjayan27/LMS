import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

 const ReviewsAndRatings = ({course}) => {
    const  {handleRatings} = useContext(AppContext)
  return (
    <div className="flex gap-2 text-xs items-center ">
                  <p>{handleRatings(course)}</p>
                  <p className="flex w-fit">
                    {[...Array(5)].map((_, i) => (
                      <img
                        src={
                          i < Math.floor(handleRatings(course))
                            ? assets.star
                            : assets.star_blank
                        }
                        key={i}
                        alt="str"
                        className="w-3"
                      />
                    ))}
                  </p>
                  <p>{course.courseRatings.length}</p>
                </div>
  )
}

export default ReviewsAndRatings