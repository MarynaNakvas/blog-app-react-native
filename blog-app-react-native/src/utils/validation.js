export const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;


export const handleFBError = (errorMessage) => {
    let updatedError = errorMessage;
    if (errorMessage) {
        if (errorMessage.includes('user-not-found')) {
            updatedError = 'You do not have an account. Please sign up.'
        } else if (errorMessage.includes('invalid-email')) {
            updatedError = 'Invalid email'
        }
    }
    return updatedError;
}
