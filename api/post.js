const { httpGet } = require('../lib/request');
const { Post } = require('../data');

/**
 * Get a post from hackernews depending on provided id
 * @param id
 * @param rank
 * @return {Promise<module.Post>}
 */
async function getPost(id, rank) {
  const { data } = await httpGet({ url: `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty` });
  return Post.fromAPI(data, rank+1);
}

/**
 * Get ids of top post - direct API call
 * @return {Promise<void>}
 */
async function getTopPostIds() {
  const { data } = await httpGet({ url: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty' });
  return data;
}

/**
 * Get Top posts specified by count
 * @param count
 * @return {Promise<({comments: (*|number), author: *, rank: *, title: *, uri: (*|string), points: (*|SVGPointList)}|{data, type}|any|string|PushSubscriptionJSON|RTCIceCandidateInit)[]>}
 */
async function getTopPosts(count) {
  const postIds = await getTopPostIds();
  return (await Promise.all(postIds.map((id,index) => getPost(id, index))))
    .filter((post, i)=> post.validate(i+1)) // remove invalid posts
    .map((post, i) => post.toJSON(i+1)) // format as desired
    .slice(0, count) // get number provided
    ;
}

exports.getTopPosts = getTopPosts;
