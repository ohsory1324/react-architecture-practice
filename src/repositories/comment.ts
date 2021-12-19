import { store } from '../redux/store';
import { addComment, removeComment, replaceComment, replaceComments } from '../redux/data';
import Comment from '../models/comment';

export default class CommentRepository {
  static get comments() {
    const { data: { comments } } = store.getState();
    return comments;
  }

  static retrieveAll(): Comment[] {
    return this.comments.map(Comment.fromJson);
  }

  static retrieve(id: number) {
    const comment = this.comments.find((comment) => comment.id === id);
    if (comment) {
      return Comment.fromJson(comment);
    }
    return undefined;
  }

  static getCommentsByPostId(postId: number) {
    return this.retrieveAll().filter((comment) => comment.postId === postId);
  }

  static add(comment: Comment) {
    store.dispatch(addComment(comment.toJson()));
  }

  static remove(id: number) {
    store.dispatch(removeComment(id));
  }

  static replaceAll(comments: Comment[]) {
    store.dispatch(replaceComments(comments.map((comment) => comment.toJson())));
  }

  static replace(id: number, comment: Comment) {
    const index = this.comments.findIndex((comment) => comment.id === id);
    store.dispatch(replaceComment({ index, comment: comment.toJson() }));
  }
}
