import { clerkClient } from "@clerk/express";
import Course from "../model/Course.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../model/Purchase.js";

//update the role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const a = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });
    res.json({
      success: true,
      error: false,
      message: "educator now publish the course",
    });
  } catch (err) {
    res.json({ succes: false, error: true, message: err.message });
  }
};

//Add new course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.json({
        success: false,
        error: true,
        meesage: "thumbnail not attached",
      });
    }
    const parsedData = await JSON.parse(courseData);
    parsedData.educator = educatorId;
    const newCourse = await Course.create(parsedData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.status(200).json({
      success: true,
      error: false,
      message: "New Course is added",
      data: newCourse,
    });
  } catch (error) {
    res.json({ success: false, error: true, message: error.message });
  }
};

//find the course
export const findCourse = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const foundedCourse = await Course.find({ educator });
    res.json({
      message: "course is founded",
      success: true,
      error: false,
      course: foundedCourse,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

//get educator dashboard data
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;
    const coursesIds = courses.map((course) => {
      course._id;
    });

    //calculate total earning
    const purchase = await Purchase.find({
      courseId: { $in: coursesIds },
      status: "completed",
    });

    const totalEarnings = purchase.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    //collect unique enrolled std ids
    const enrolledStudents = [];

    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );
      students.forEach(student=>{
        enrolledStudents.push({
            courseTitle: course.courseTitle,
            student
        })
      })
    }

    res.status(200).json({
        success: true  ,
        error : false ,
        dashboardData : {
            totalEarnings,
            enrolledStudents,
            totalCourses,
        }
    })
  } catch (error) {
    res
      .status(404)
      .json({ message: error.message, success: true, error: false });
  }
};

//total enrolled students for single educator\

export const getEnrolledStudentData =async(req,res)=>{
  try {

    const educator = req.auth.userId
    const courses = await Course.find({educator})    
    const courseIds = courses.map((course)=>{
      course._id
    })

    const purchase = await Purchase.find({
      courseId: {$in : courseIds},
      status: 'completed'
    }).populate('userId' , 'name imageUrl').populate('courseId','courseTitle')

    const enrolledStudent = purchase.map(purchase=> ({
      student : purchase.userId,
      courseTitle : purchase.courseId.courseTitle,
      purchased : purchase.createdAt
    }))

    res.status(200).json({
      success : true,
      error : false,
      message: "enrolled students are listed",
      enrolledStudent
    })
    
  } catch (error) {
    res.status(404).json({
      success:false,
      error:true,
      message : error.message
    })
  }
}