const fs = require("fs").promises
const path = require("path")

class Courses {
    async find(criteria = () => true) {
        const coursesPath = path.join(__dirname, "gened.json")
        const contents = await fs.readFile(coursesPath, "utf-8")
        return JSON.parse(contents).filter(criteria)

    }

}

module.exports = new Courses()