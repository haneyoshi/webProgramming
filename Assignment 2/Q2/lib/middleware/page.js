const gePages = () => [
  {
    page: {
      name: 'index',
    },
    pageUrl: '/index',
  },
  {
    page: {
      name: 'lectures',
    },
    pageUrl: '/lectures',
  },
  {
    page: {
      name: 'marks',
    },
    pageUrl: '/marks',
  },
  {
    page: {
      name: 'contact',
    },
    pageUrl: '/contact',
  }
]

const pagesMiddleware = (req, res, next) => {
  if(!res.locals.partials) res.locals.partials = {}
  res.locals.partials.pageContent = gePages()
  next()
}

module.exports = pagesMiddleware