module.exports = [
    {
        validator: (email) => /\S+@\S+\.\S+/.test(email),
        message: 'jeneric.error.email.not_valid'
    },
];
