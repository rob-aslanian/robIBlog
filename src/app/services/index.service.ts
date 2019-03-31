import { UsersService } from "./users.service";
import { MessagesService } from "./messages.service";
import { LsService } from "./ls.service";
import { AuthService } from "./auth.service";

const USERS_API = "http://localhost:7272/api/users/",
  MESSAGES_API = "http://localhost:7272/api/posts/";

export const RobIBlogServices: Array<any> = [
  { provide: UsersService, useClass: UsersService },
  { provide: MessagesService, useClass: MessagesService },
  { provide: LsService, useClass: LsService },
  { provide: AuthService, useClass: AuthService },
  { provide: "USERS_API", useValue: USERS_API },
  { provide: "MESSAGES_API", useValue: MESSAGES_API }
];
