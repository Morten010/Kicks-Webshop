let errors = {
    firstName: "",
    lastName: "",
    gender: "",
    email: "", 
    password: ""
}

export const validate = async (values: userProps) => {

    // validate first name
    if(!values.firstName){
        errors.firstName = "Required"
    } else if(values.firstName.length == 1){
        errors.firstName = "Has to be at least 2 characters"
    }else if(values.firstName.includes(" ")){
        errors.firstName = "Invalid first name"
    } else {
        errors.firstName = ""
    }

    // validate last name
    if(!values.lastName){
        errors.lastName = "Required"
    } else if(values.lastName.length == 1){
        errors.lastName = "Has to be at least 2 characters"
    } else if(values.lastName.includes(" ")){
        errors.lastName = "Invalid last name"
    }else {
        errors.lastName = ""
    }

    // validate gender
    if(!values.gender){
        errors.gender = "Required"
    } else {
        errors.gender = ""
    }

    // validate email
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    if(!values.email){
        errors.email = "Required"
    } else if(!regex.test(values.email)){
        errors.email = "Invalid email"
    } else{
        errors.email = ""
    }

    // validate first name
    if(!values.password){
        errors.password = "Required"
    } else if (values.password.length < 6 || values.password.length > 20){
        errors.password = "Password must be greater than 6 and less than 20 characters"
    } else {
        errors.password = ""
    }

    return errors
}