/**
 * @file
 * @author 何文林
 * @date 2017/7/4
 */
const querystring = require('querystring')
const Aticles = require('../models/article')
const article = new Aticles()
// 添加文章
const add = async (ctx, next) => {
  let opts = ctx.request.body
  if (!opts.title || !opts.editStr || !opts.contentStr || !opts.describe) {
    ctx.body = {
      status: true,
      message: '缺少标题、描述或者内容'
    }
  }
  if (opts.tags) {
    opts.tags = opts.tags.split(',').map(v => v.trim()).filter(v => v)
  }
  const newArticle = await article.save(opts)
  if (newArticle) {
    ctx.body = {
      status: true,
      message: '添加文章成功'
    }
  } else {
    ctx.body = {
      status: false,
      message: '添加文章失败',
      data: newArticle
    }
  }
}
// 获取文章列表
const getArticles = async (ctx, next) => {
  const opts = ctx.request.body
  const page = opts.page || 0
  const limit = 8
  const skip = page * limit
  const sort = { 'meta.createAt': -1 }
  const aticles = await article.query(skip, limit, sort)
  if (aticles && aticles.length > 0) {
    ctx.body = {
      status: true,
      aticles
    }
  } else {
    ctx.body = {
      status: false,
      data: aticles
    }
  }
}
// 根据 tag 下面所有的文章
const getTags = async (ctx, next) => {
  let urlQuery = querystring.parse(ctx.request.url.split('?')[1])
  if (!urlQuery.tags) {
    ctx.body = {
      status: false,
      message: '请输入查找的标签'
    }
  }
  let tagArr = []
  tagArr.push(decodeURIComponent(urlQuery.tags))
  const tagOpts = {
    tags: {
      $all: tagArr
    }
  }
  console.log(tagOpts)
  const aticles = await article.queryTag(tagOpts)
  if (aticles && aticles.length > 0) {
    ctx.body = {
      status: true,
      aticles
    }
  } else {
    ctx.body = {
      status: false,
      data: aticles
    }
  }
}

// 获取指定文章
const getOneArticle = async (ctx, next) => {
  const id = ctx.params.id
  const data = await article.queryOne({ _id: id })
  if (data) {
    ctx.body = {
      status: true,
      data
    }
  } else {
    ctx.body = {
      status: false,
      message: '获取文章失败',
      data
    }
  }
}

module.exports = {
  add,
  getArticles,
  getTags,
  getOneArticle
}
