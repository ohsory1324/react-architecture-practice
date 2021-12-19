import { store } from '../redux/store';
import { addPost, removePost, replacePost, replacePosts } from '../redux/data';
import Post from '../models/post';

export default class PostRepository {
  static get posts() {
    const { data: { posts } } = store.getState();
    return posts;
  }

  static retrieveAll(): Post[] {
    return this.posts.map(Post.fromJson);
  }

  static retrieve(id: number): Post | undefined {
    const post = this.posts.find((post) => post.id === id);
    if (post) {
      return Post.fromJson(post);
    }
    return undefined;
  }

  static add(post: Post) {
    store.dispatch(addPost(post.toJson()));
  }

  static remove(id: number) {
    store.dispatch(removePost(id));
  }

  static replaceAll(posts: Post[]) {
    store.dispatch(replacePosts(posts.map((post) => post.toJson())));
  }

  static replace(id: number, post: Post) {
    const index = this.posts.findIndex((post) => post.id === id);
    store.dispatch(replacePost({ index, post: post.toJson() }));
  }
}
