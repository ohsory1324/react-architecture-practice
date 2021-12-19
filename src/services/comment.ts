import Comment, { IComment } from '../models/comment';
import CommentRepository from '../repositories/comment';
import Api from './api';

export default class CommentService {
  static async createComment(comment: Omit<IComment, 'id'>): Promise<Comment> {
    const newComment = await Api.comment.createComment(comment);
    CommentRepository.add(newComment);

    return newComment;
  }

  static async fetchComments() {
    const comments = await Api.comment.fetchComments();
    CommentRepository.replaceAll(comments);

    return comments;
  }

  static async deleteComment(id: number) {
    await Api.comment.deleteComment(id);
    CommentRepository.remove(id);
  }
}
