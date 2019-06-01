const { httpGet } = require('../lib/request');
const { Post } = require('../data');

async function getPost(id, rank) {
  const { data } = await httpGet({ url: `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty` });
  return Post.fromAPI(data, rank+1);
}

async function getTopPostIds(count) {
  const { data } = await httpGet({ url: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty' });
  return data.slice(0, count);
}

async function getTopPosts(count) {
  const postIds = await getTopPostIds(count);
  return (await Promise.all(postIds.map((id,index) => getPost(id, index))))
    .map(post => post.toJSON());
}

exports.getTopPosts = getTopPosts;
