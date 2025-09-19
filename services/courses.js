const CoursesModel = require('../models/courses')
const GenEdModel = require('../models/gened')


class CourseServices {
    async getCoursesBySubject(subjectCode) {
        const courses = await CoursesModel.find(course => course.course_Code === "string" && course.courseCode.startsWith(subjectCode))
        return await courses
    }

    async getCoursesByGenedCategory(category) {
        const allCourses = await CoursesModel.find()
        const setCodes = new set(allCourses.map(course => course.course_Code))

        const codesInSet = await GenEdModel.find(gened => gened.categories===category && setCodes.has(gened.course_Code))
    
    return codesInSet
    }

}

module.exports = new CourseServices()

