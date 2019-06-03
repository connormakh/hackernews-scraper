const { validateUri } = require('../lib/tools');
module.exports = class Post {
  /**
   * Construct a Post object independent of the source
   * @param data
   * @param data.comments
   * @param data.rank
   * @param data.score
   * @param data.author
   * @param data.title
   * @param data.uri
   * @param data.points
   */
  constructor(data) {
    this.comments = data.comments;
    this.points = data.points;
    this.author = data.author;
    this.title = data.title;
    this.uri = data.uri;
    this.rank = data.rank;
  }

  /**
   * Construct a post from a hackernews API call
   * @param data
   * @param index
   * @return {module.Post}
   */
  static fromAPI(data, index) {
    return new Post({
      comments: data.kids ? data.kids.length : 0,
      author: data.by,
      title: data.title,
      uri: data.url,
      points: data.score,
    })
  }

  /**
   * Form Post JSON structure to be emitted to frontend
   * @return {{comments: (*|number), author: *, rank: *, title: *, uri: (*|string), points: (*|SVGPointList)}}
   */
  toJSON(rank) {
    return {
      title: this.title,
      uri: this.uri,
      author: this.author,
      points: this.points,
      comments: this.comments,
      rank
    }
  }

  /**
   * Validate that an existing post object passes requirements
   */
  validate(rank) {
    return Number.isInteger(this.comments)
      && this.comments >= 0
      && validateUri(this.uri)
      && rank >= 0
      && Number.isInteger(this.points)
      && this.points >= 0
      && this.title
      && this.title.length <= 256
      && this.author
      && this.author.length <= 256
  }
}
