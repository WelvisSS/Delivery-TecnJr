require("../Schemas/Autenticate")

const express = require('express')

const nodemailer = require('nodemailer')

const SMTP_CONFIG = require('../config/smtp')

const router = express.Router()

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const jwt = require('../setup/jwt')

const pageReset = require('../Views/pageReset')

const User = mongoose.model("user")

router.use(bodyParser.json())

router.post('/signup', async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const doesExist = await User.findOne({ email });

        if (doesExist) throw 409;

        const user = new User({ name, email, password });

        const savedUser = await user.save();

        const token = jwt.sign({ user: savedUser.id });

        res.send({
            name: savedUser.name,
            email: savedUser.email,
            _id: savedUser._id,
            token
        });

    } catch (error) {

        res.send(error);

    }

})

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email, password })

        if (!user) return res.send(401)

        const token = jwt.sign({ user: user.id })

        res.send({ user, token })

    } catch (error) {
        res.send(error)
    }

})

// Contém todas as configurações do processo de envio de email
const transporter = nodemailer.createTransport({
    // O rost que será utilizado
    host: SMTP_CONFIG.host,
    // A porta que será utilizada
    port: SMTP_CONFIG.port,
    // Nesta parte mudando o valor para true, vai possibilitar que mais 
    // configurações de segurança no envio de email sejam configuradas.
    secure: false,
    // Configurações de autenticação de usuário, inserindo o email e senha 
    // da conta que ira enviar os emails.
    auth: {
        // Recebe o email da conta que enviará o email.
        user: SMTP_CONFIG.user,
        // Recebe o password da conta que enviará o email.
        pass: SMTP_CONFIG.pass
    },
    // Configurando como false para que não seja rejeitado a permisão de envio de 
    // email através deste meio. 
    tls: {
        rejectUnauthorized: false
    }
})

// Função com as configurações padrões do email.
async function run(url, email) {
    const mailSent = await transporter.sendMail({
        // URL de redefinição de senha
        text: `${url}`,
        subject: 'Link de redefinição de senha Delivery TecnoJr',
        form: 'Tecno Jr',
        to: [email]
    })
}

router.post('/recover', async (req, res) => {

    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) throw 409;

        user.generatePasswordReset();

        const savedUser = await user.save();

        const url = `https://auth-api-user.herokuapp.com/user/pageReset/:#${savedUser.resetPasswordToken}`

        run(url, email)

        res.send('Link enviado via e-mail')

    } catch (error) {

        res.send(error);

    }

})


router.post('/reset', async (req, res) => {

    try {

        const { token } = req.params;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) return res.status(401).json({
            message: 'O token de redefinição de senha é inválido ou expirou.'
        });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
})


// Redefinição de senha.
router.post('/resetPassword', async (req, res) => {

    try {

        const { password, token } = req.body;

        const user = await User.findOne({ 
            resetPasswordToken: token, 
            resetPasswordExpires: { $gt: Date.now() } 
        })
            
        if (!user) return res.status(401).json({
            message: 'O token de redefinição de senha é inválido ou expirou.'
        });
    
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
    
        const saveUser = await user.save();
    
        res.status(200).json({
            message: 'Redefinição feita com sucesso, acesse a página de login.'
        });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

})

router.get('/pageReset/:token', async (req, res) => {

    try {

        res.send(pageReset)

    } catch (error) {

        res.status(500).json({ message: error.message });

    }    

})

module.exports = router