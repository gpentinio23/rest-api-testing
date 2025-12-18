const CoursesModel = require('../models/courses')
const GenEdModel = require('../models/gened')


class CourseServices {
    async getCoursesBySubject(subjectCode) {
        const courses = await CoursesModel.find(course => typeof course.course_code === "string" && course.course_code.startsWith(subjectCode))
        return courses.filter(
            course =>
                typeof course.course_code==="string"&& course.course_code.startsWith(subjectCode)
        )
    }

    async getCoursesByGenedCategory(category) {
        const allCourses = await CoursesModel.find()
        const setCodes = new Set(allCourses.map(course=>course.course_code))
        const genedCourses = await GenEdModel.find(gened => gened.category===category)
        const matchingCourses = genedCourses.filter(gened =>
            gened.req.some(req =>
                req.course_code.some(code =>
                    setCodes.has(code)
                )
        ))
        return matchingCourses
    }
    
}

module.exports = new CourseServices()
