
export async function loginValidation (values: {
    email: string
    password: string
}) {
    const {email, password} = values
    const errors = {
        email: "",
        password: "",
    }

    // email validation
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if(!regex.test(email)){
        errors.email = "Invalid email"
    } else{
        errors.email = ""
    }

    // password
    if (values.password.length < 6 || values.password.length > 20){
        errors.password = "Password must be greater than 6 and less than 20 characters"
    } else {
        errors.password = ""
    }

    return errors
}