const Joi = require('Joi')
const coursesController = require('../controllers/courses')



module.exports = [
    {
        method: "GET",
        path: "/courses/subject/{subjectCode}",
        handler: coursesController.getCoursesBySubject

    },
    {
        method: "GET",
        path: "/courses/gened/{category}",
        handler: coursesController.getGenEdCoursesByCategory
    }
]