module.exports = [
    {
        validator: function (passwordRepeat) {
            return passwordRepeat === this.password
        },
        message: 'jeneric.error.password.password_repeat'
    }
];
