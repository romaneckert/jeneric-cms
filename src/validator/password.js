module.exports = [
    {
        validator: (password) => /\d/.test(password),
        message: 'jeneric.error.password.one_number_required'
    },
    {
        validator: (password) => /[a-zA-ZöäüÖÜA]/.test(password),
        message: 'jeneric.error.password.one_letter_required'
    },
    {
        validator: (password) => /[\@\^\#\(\)\[\]\{\}\?\!\$\%\&\/\=\*\+\~\,\.\;\:\<\>\-\_]/.test(password),
        message: 'jeneric.error.password.one_special_char_required'
    },
    {
        validator: (password) => password.length > 7,
        message: 'jeneric.error.password.min_length_8'
    },
    {
        validator: (password) => password.length < 101,
        message: 'jeneric.error.password.max_length_100'
    },
    {
        validator: (password) => {

            for (let char of password) {
                if (-1 === 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZöüäÖÜÄ0123456789@^#()[]{}?!$%&/=*+~,.;:<>-_'.split('').indexOf(char)) return false;
            }

            return true;
        },
        message: 'jeneric.error.password.illegal_characters'
    }
];
