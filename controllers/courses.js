
const CourseServices = require('../services/courses')

class CourseController {
    async getCoursesBySubject({ params: { subjectCode } }) {
        const sCode = await CourseServices.getCoursesBySubject(subjectCode)
        return JSON.stringify(sCode)
    }
    async getGenEdCoursesByCategory({ params: { category } }) {
        const cCode = await CourseServices.getCoursesByGenedCategory(category)
        return JSON.stringify(cCode)
    }
}

module.exports = new CourseController()