const CoursesModel = require('../models/courses')
const GenEdModel = require('../models/gened')


class CourseServices {
    async getCoursesBySubject(subjectCode) {
        const courses = await CoursesModel.find(course => typeof course.course_code === "string" && course.course_code.startsWith(subjectCode))
        return courses
    }

    async getCoursesByGenedCategory(category) {
        const allCourses = await CoursesModel.find()
        const setCodes = new Set(allCourses.map(course => course.course_code.split(" ")[0] + " " + course.course_code.split(" ")[1]))
        const genedCourses = await GenEdModel.find(g => g.category === category )
        const codesInSet = genedCourses.filter(gened=>gened.req.some(r=>r.course_code.some(code=>setCodes.has(code))))
        return codesInSet
    }
    
}

module.exports = new CourseServices()
