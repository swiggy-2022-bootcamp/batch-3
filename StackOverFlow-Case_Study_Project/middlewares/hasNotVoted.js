/**
 * Middleware to check if user has up voted an
 * question or not.
 */
function hasNotVoted(req, res, next ) {
    console.log('From hasNotAnswered.')
    next();
}

module.exports = { hasNotVoted };