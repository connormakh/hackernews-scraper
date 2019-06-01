module.exports = class Post {
  /**
   *
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

  static fromAPI(data, index) {
    return new Post({
      comments: data.kids ? data.kids.length : 0,
      author: data.by,
      title: data.title,
      uri: data.url,
      rank: index,
      points: data.score,
    })
  }

  toJSON() {
    return {
      title: this.title,
      uri: this.uri,
      author: this.author,
      points: this.points,
      comments: this.comments,
      rank: this.rank
    }
  }
}
