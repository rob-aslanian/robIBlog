export interface Message {
  id?: number;
  user_id?: number;
  title: string;
  body: string;
  createdAt?: string;
  imageData?: string;
  imageName?: string;
}

export class Messages implements Message {
  id?: number;
  user_id?: number;
  title: string;
  body: string;
  createdAt?: string;
  imageData?: string;
  imageName?: string;

  constructor(obj?: Message) {
    this.id = obj.id || null;
    this.user_id = obj.user_id || null;
    this.title = obj.title || null;
    this.body = obj.title || null;
    this.createdAt = obj.createdAt || null;
    this.imageName = obj.imageName || null;
  }
}
