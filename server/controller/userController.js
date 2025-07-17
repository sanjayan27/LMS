import Stripe from "stripe";
import Course from "../model/Course.js";
import { Purchase } from "../model/Purchase.js";
import User from "../model/user.model.js";
import { Progress } from "../model/courseProgressModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId);

    if (!userData) {
      res.json({
        message: "User not found",
        success: false,
        error: true,
      });
    }
    res.json({
      message: "User found",
      success: true,
      error: false,
      userData,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId);

    res.json({
      message: "User found",
      success: true,
      error: false,
      userData: userData.enrolledCourses,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const purchaseCourse = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { origin } = req.headers;
    const { courseId } = req.body;
    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "data not found",
      });
    }

    const purchaseData = {
      courseId: courseId,
      userId: userId,
      amount:
        courseData.coursePrice -
        (courseData.coursePrice * courseData.discount) / 100,
    };

    const newPurchaseData = await Purchase.create(purchaseData);

    //stripe gateway initializing
    const stripeInstances = new Stripe(process.env.STRIPE_SECRET_KEY);

    const currency = process.env.CURRENCY.toLowerCase();

    //creating line items for stripe
    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: courseData.courseTitle,
          },
          unit_amount: Math.floor(newPurchaseData.amount) * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstances.checkout.sessions.create({
      success_url: `${origin}/loading/my-enrollements`,
      cancel_url: `${origin}`,
      line_items: line_items,
      mode: "payment",
      metadata: {
        purchaseId: newPurchaseData._id.toString(),
      },
    });

    res.status(200).json({
      success: true,
      error: false,
      session_url: session.url,
    });
  } catch (err) {
    res.status(404).json({
      error: true,
      success: false,
      message: err.message,
    });
  }
};

//update course user progress

export const updateCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, lectureId } = req.body;

    const progress = await Progress.findOne({ courseId, userId });

    if (progress) {
      if (progress.lectureCompleted.includes(lectureId)) {
        return res.status(200).json({
          success: true,
          message: "course Already Completed",
        });
      }
      progress.lectureCompleted.push(lectureId);
    } else {
      await Progress.create({
        userId,
        courseId,
        lectureCompleted: [lectureId],
      });
    }
    return res.json({
      message: "progress updated",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//get user progresss progress data

export const getCourseProgressData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId } = req.body;
    const getProgress = await Progress.findOne({ userID, courseId });

    res.status(200).json({
      success: true,
      getProgress,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//add user rating

export const addUserRating = async (req, res) => {
  const userId = req.auth.userId;
  const { courseId, rating } = req.body;

  if (!userId || !courseId || !rating || rating < 1 || rating > 5) {
    res.json({
      saccess: false,
      error: true,
      message: "invalid data",
    });
  }

  try {
    const course = await Course.findById({ courseId });

    if (!course) {
      res.status(404).json({
        success: false,
        error: true,
        message: " course not available",
      });
    }

    const user = await User.findById(userId);

    if (!user || !user.enrolledCourses.includes(courseId)) {
      res.status(404).json({
        success: false,
        error: true,
        message: "user first need to purchase this course",
      });
    }

    const existingRatingIndex = course.courseRatings.findIndex(
      (r) => r.userId === userId
    );

    if (existingRatingIndex > -1) {
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      course.courseRatings.push({ userId, rating });
    }

    await Course.save();

    res.status(200).json({
      success: true,
      error: false,
      message: "rating added",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
