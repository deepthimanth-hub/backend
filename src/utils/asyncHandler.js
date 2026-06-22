const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((error) => next(error))
    }
}

export { asyncHandler }








/* instead of using try and catch block in every controller, we can use this asyncHandler function to handle errors in a centralized way.
 It takes a function as an argument and returns a new function that wraps the original function in a try-catch block. 
 If an error occurs,it will be caught and passed to next middleware, which will handle error and send a response to client.
 this way, we can avoid repeating same error handling code in every controller and keep code clean and maintainable.

const asyncHandler = (fn) => async(req, res, next) => {
try {
    await fn(req, res, next)
} catch (error) {
    res.status(error.code || 500).json({
        success: false,
        message: error.message
    })
}
}
*/