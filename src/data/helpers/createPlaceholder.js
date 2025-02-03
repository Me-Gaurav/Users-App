export const createPlaceholder = (input) => {
    return "Enter " + input.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
}