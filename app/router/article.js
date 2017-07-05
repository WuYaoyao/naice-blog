/**
 * @file
 * @author 何文林
 * @date 2017/6/29
 */
const router = require('koa-router')()
const articles = require('../controllers/article')
const comments = require('../controllers/comment')

router.get('/', articles.getArticles)
router.post('/add', articles.add)
router.get('/tag', articles.getTags)

router.post('/addComment', comments.addComment)
router.get('/getComment', comments.getComment)
router.post('/deleteComment', comments.deleteComment)

router.get('/:id', articles.getOneArticle)
module.exports = router
