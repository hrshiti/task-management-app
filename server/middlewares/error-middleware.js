const errorMiddleware = (err, req, res, next) => {
    console.error("Error occurred:", err.message);
    
   
    if (err.name === 'ValidationError') {
        res.status(400).json({ message: err.message });
    } else if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: "Unauthorized" });
    } else if (err.name === 'NotFoundError') {
        res.status(404).json({ message: "Resource not found" });
    } else {
        res.status(500).json({ message: "Internal server error" });
    }
    next(err);
}
module.exports = errorMiddleware;