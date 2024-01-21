import { User } from "./user";

export interface iProfile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
}

export class Profile implements iProfile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
}
