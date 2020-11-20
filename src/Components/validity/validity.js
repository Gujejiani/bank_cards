



export const checkValidity = (formelement, rules, pin) => {
    let valid = true


    if (!rules) {
        return true
    }
    if (rules.confirm) {


        return formelement.value === pin
    }

    if (rules.length) {
        return formelement.value.length === rules.length
    }
    if (rules.name) {
        return formelement.value.length > 1
    }


    return valid
}

