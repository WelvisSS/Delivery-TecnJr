require('dotenv').config()

const { EMAIL, PASSWORD } = process.env;

module.exports = {
    host: "smtp.gmail.com",
    port: 587,
    user: `${EMAIL}`,
    pass: `${PASSWORD}`
}

