import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import uniqid from "uniqid";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../../component/student/Loading";

export const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const { currency, BACKEND_URL, getToken } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectures, setLectures] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleAddChapter = (action, chapterId) => {
    if (action === "Add") {
      const title = prompt("Enter The Chapter Title: ");

      const newChapterData = {
        chapterId: uniqid(),
        chapterTitle: title,
        chapterContent: [],
        collapsed: false,
        chapterOrder:
          chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
      };
      setChapters([...chapters, newChapterData]);
    } else if (action === "Remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "Toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleSubmitLecture = (action, chapterId, lectureIndex) => {
    if (action === "Add") {
      setCurrentChapterId(chapterId);
      setShowPopup(!showPopup);
    } else if (action === "Remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };
  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLectures = {
            ...lectures,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLectures);
        }
        return chapter;
      })
    );
    setShowPopup(!showPopup);
    setLectures({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      if (!image) {
        toast.error("Thumbnail is not selected");
      }
      const courseData = {
        courseTitle: title,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(price),
        discount: Number(discount),
        courseContent: chapters,
      };

      const formData = new FormData();

      formData.append("courseData", JSON.stringify(courseData));
      formData.append("image", image);

      const token = await getToken();

      const { data } = await axios.post(
        BACKEND_URL + "/api/educator/add-course",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setPrice(null);
        setDiscount(null);
        setImage(null);
        setChapters([]);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return !isLoading ? (
    <section
      className="h-screen overflow-scroll [&::-webkit-scrollbar]:hidden scrollbar-hide
     flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0"
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // 👈  cancels auto‑submit
          }
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="">Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type Here...!"
            name="courseTitle"
            className=" p-2 outline-none rounded bg-gray-500/10"
          />
        </div>
        <div className="flex flex-col gap-5">
          <p>Course Discription</p>
          <div ref={editorRef} className="bg-gray-500/10 rounded"></div>
        </div>
        <div className="flex flex-row  items-center justify-between">
          <div className="flex  flex-col gap-3">
            <label htmlFor="forPrice">Set Price</label>
            <input
              type="number"
              id="forPrice"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={`${currency}0`}
              className="bg-gray-500/10 rounded px-3 py-1 outline-none max-w-30"
            />
          </div>
          <div className="flex  flex-col gap-3">
            <label htmlFor="forFile">Upload Thumbnail</label>
            <label
              htmlFor="forFile"
              className="flex flex-row gap-2 items-center"
            >
              <img
                src={assets.file_upload_icon}
                alt=""
                className="p-3 bg-blue-500 rounded cursor-pointer"
              />
              <input
                id="forFile"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              <img
                className="max-h-10"
                src={
                  image ? URL.createObjectURL(image) : assets.course_1_thumbnail
                }
                alt=""
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="forDiscount">Set Discount</label>
          <input
            type="number"
            id="forDiscount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="0%"
            className="bg-gray-500/10 rounded px-3 py-1 outline-none max-w-30"
            min={0}
            max={100}
          />
        </div>
        {/* addd course chapter button */}

        <div>
          {chapters.map((chapter, chapIndex) => (
            <div
              key={chapIndex}
              className="border border-gray-500/20  rounded  mb-5"
            >
              <div className="bg-gray-500/10 rounded flex py-3 px-3 justify-between">
                <div
                  className="flex items-center gap-2 cursor-pointer "
                  onClick={() => handleAddChapter("Toggle", chapter.chapterId)}
                >
                  <img
                    src={assets.dropdown_icon}
                    alt=""
                    className={`w-4 ${chapter.collapsed ? "rotate-180" : ""}`}
                  />
                  <div className="capitalize">
                    {chapIndex + 1} <span>{chapter.chapterTitle}</span>
                  </div>
                </div>
                <div className="flex gap-4 text-gray-600">
                  <p>{chapter.chapterContent.length} Lectures</p>
                  <img
                    src={assets.cross_icon}
                    alt=""
                    className="cursor-pointer"
                    onClick={() =>
                      handleAddChapter("Remove", chapter.chapterId)
                    }
                  />
                </div>
              </div>
              <div className={chapter.collapsed ? "p-3" : ""}>
                {chapter.collapsed && (
                  <div className=" flex flex-col gap-3">
                    {chapter.chapterContent.map((lecture, lectIndex) => (
                      <div
                        key={lectIndex}
                        className="flex items-center justify-between"
                      >
                        <span className="capitalize">
                          {lectIndex + 1} {lecture.lectureTitle} -{" "}
                          {
                            <a
                              className="text-blue-600 font-custom2"
                              href={lecture.lectureUrl}
                            >
                              Link
                            </a>
                          }{" "}
                          - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                        </span>
                        <span>
                          <img
                            src={assets.cross_icon}
                            alt=""
                            onClick={() =>
                              handleSubmitLecture(
                                "Remove",
                                chapter.chapterId,
                                lectIndex
                              )
                            }
                            className="cursor-pointer"
                          />
                        </span>
                      </div>
                    ))}
                    <button
                      className="bg-gray-500/10 px-3 rounded mt-4 cursor-pointer w-fit py-2 outline-none"
                      onClick={() =>
                        handleSubmitLecture("Add", chapter.chapterId)
                      }
                      type="button"
                    >
                      + Add Lectures
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div>
          <button
            className="bg-gray-500/10 px-3 py-2 rounded w-full cursor-pointer"
            onClick={() => handleAddChapter("Add")}
            type="button"
          >
            + Add Chapter
          </button>
        </div>
        {showPopup && (
          <div className="fixed inset-0 z-50">
            {/* Dark semi-transparent background */}
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>

            {/* Popup content */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="bg-white text-gray-700 p-4 rounded w-full flex flex-col gap-3 max-w-80">
                <div className="text-black font-custom2 flex justify-between items-center">
                  <h1 className="text-black font-custom2">Add Lectures</h1>
                  <img
                    src={assets.cross_icon}
                    alt="Close"
                    className="cursor-pointer"
                    onClick={() => setShowPopup(false)}
                  />
                </div>
                <div className="mt-2 flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="forLectTitle">Lecture Title</label>
                    <input
                      type="text"
                      className="bg-gray-500/20 rounded outline-none px-2 py-1"
                      required
                      id="forLectTitle"
                      value={lectures.lectureTitle}
                      onChange={(e) =>
                        setLectures({
                          ...lectures,
                          lectureTitle: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="forLectDuration">
                      Lecture Duration (min)
                    </label>
                    <input
                      type="text"
                      className="bg-gray-500/20 rounded outline-none px-2 py-1"
                      required
                      id="forLectDuration"
                      value={lectures.lectureDuration}
                      onChange={(e) =>
                        setLectures({
                          ...lectures,
                          lectureDuration: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="forLectURL">Lecture URL</label>
                    <input
                      type="text"
                      id="forLectURL"
                      className="bg-gray-500/20 rounded outline-none px-2 py-1"
                      required
                      value={lectures.lectureUrl}
                      onChange={(e) =>
                        setLectures({ ...lectures, lectureUrl: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-row gap-2">
                    <label htmlFor="forPreview">Is Preview Free?</label>
                    <input
                      type="checkbox"
                      id="forPreview"
                      className="scale-125 cursor-pointer"
                      value={lectures.isPreviewFree}
                      onChange={(e) =>
                        setLectures({
                          ...lectures,
                          isPreviewFree: e.target.checked,
                        })
                      }
                    />
                  </div>

                  <div>
                    <button
                      className="w-full bg-blue-600 text-white rounded py-1 cursor-pointer"
                      onClick={addLecture}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <button className="mb-10 bg-blue-700  cursor-pointer text-white rounded py-2 hover:bg-blue-600 transition-all ">
          Add Course
        </button>
      </form>
    </section>
  ) : (
    <Loading />
  );
};
