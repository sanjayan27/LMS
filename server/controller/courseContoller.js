import Course from "../model/Course.js";

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select(["-enrolledStudents"])
      .populate({ path: "educator" });


    res.status(200).json({
      success: true,
      error: false,
      message: "all courses  are listed",
      data : courses
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};


//get course by id
 
export const fetCourseById=async(req,res)=>{
    try {
        const { id } = req.params
      const courseData = await Course.findById(id).populate({path : 'educator'})

      //remove lecture url if prview is  false 
      courseData.courseContent.forEach(chapter => {
        chapter.chapterContent.forEach(lecture =>{
          if(!lecture.isPreviewFree){
            lecture.lectureUrl = ""
          }
        })
      })

        res.json( {
          courseData , success : true , error:false , message: 'the individual course is listed  by id',
  
        })
        
    } catch (error) {
        res.status(404).json({
      success:false,
      error:true,
      message : error.message
    })
    }
}