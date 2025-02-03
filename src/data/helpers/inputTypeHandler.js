export const inputTypeHandler = (input) => {
    let type = "text"
    if (input === "email") {
        type = "email"
    } else if (input === "zipCode") {
        type = "number"
    }
    return type
}   