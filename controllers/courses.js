
const CourseServices = require('../services/courses')

class CourseController {
    async getCoursesBySubject(request) {
        const { subjectCode } = request.params
        const sCode = await CourseServices.getCoursesBySubject(subjectCode)
        return JSON.stringify(sCode)
    }
    async getGenEdCoursesByCategory(request) {
        const { category } = request.params
        const cCode = await CourseServices.getCoursesByGenedCategory(category)
        return JSON.stringify(cCode)
    }
}

module.exports = new CourseController()