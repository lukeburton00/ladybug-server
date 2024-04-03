const Project = require("../../models/project.js");
const User = require("../../models/user.js");

exports.getUserProjects = async(user_id) => {
    // define empty attribute to exclude join table records from result
    const user = await User.findByPk(user_id, { 
        include: [{ 
            model: Project,
            through: { attributes: [] } 
        }] 
    })

    return user.projects;
};