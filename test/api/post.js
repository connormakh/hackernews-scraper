const assert = require('assert');
const { getTopPosts } = require('../../api');
describe('post', () => {
  let number = Math.floor(Math.random() * 100);
  it('getTopPosts', async () => {
    const resp = await getTopPosts(number);
    assert.equal(resp.length, number);
    resp.forEach(item => {
      assert('title' in item);
      assert('uri' in item);
      assert('author' in item);
      assert('points' in item);
      assert('comments' in item);
      assert('rank' in item);
    })
  });
});
