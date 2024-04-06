module.exports = function (req, res, next) {
  res.set('X-Frame-Options', 'ALLOW-FROM *')

  return next()
}
