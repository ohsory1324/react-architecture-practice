import Api from './api';
import Post, { IPost } from '../models/post';
import PostRepository from '../repositories/post';

export default class PostService {
  static async createPost(post: Omit<IPost, 'id'>): Promise<Post> {
    const newPost = await Api.post.createPost(post);    
    PostRepository.add(newPost);

    return newPost;
  }

  static async fetchPosts() {
    const posts = await Api.post.fetchPosts();
    PostRepository.replaceAll(posts);

    return posts;
  }

  static async deletePost(id: number) {
    await Api.post.deletePost(id);
    PostRepository.remove(id);
  }
}
