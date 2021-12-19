import { JsonObj } from './utils';

export interface IComment {
  id: number;
  body: string;
  postId: number;
}

export default class Comment implements IComment {
  constructor(
    readonly id: number,
    readonly body: string,
    readonly postId: number,
  ) {}

  static fromJson(json: JsonObj) {
    return new Comment(json.id, json.body, json.postId);
  }

  toJson(): IComment {
    return {
      id: this.id,
      body: this.body,
      postId: this.postId,
    };
  }
}
