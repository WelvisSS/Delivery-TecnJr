const mongoose = require('mongoose')
const crypto = require('crypto')

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            select: false,
            set: value =>
                crypto
                    .createHash('md5')
                    .update(value)
                    .digest('hex')
        },

        resetPasswordToken: {
            type: String,
            required: false
        },

        resetPasswordExpires: {
            type: Date,
            required: false
        }
    },

    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
    }
)

schema.methods.generatePasswordReset = function () {

    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000;

};


mongoose.model('user', schema)