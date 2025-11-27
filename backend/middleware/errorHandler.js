export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);

    if (err.name === 'SyntaxError') {
        return res.status(400).json({
            message: 'Invalid JSON format'
        });
    }

    res.json({ message: err.message || 'Oops! Something went wrong.' });

    next();
}