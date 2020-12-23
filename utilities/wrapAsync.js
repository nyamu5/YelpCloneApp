function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => {console.log(e); next(e)}
    );
  };
}

module.exports = wrapAsync;
