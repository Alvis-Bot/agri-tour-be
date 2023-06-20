import { UserCreateDto } from "../../common/dto/user-create.dto";
import { User } from "../../common/entities/user.entity";
import { Pagination } from "../../common/pagination/pagination.dto";

export interface IUserService {
  createUser(dto: UserCreateDto): Promise<User>;
  getUserById(id: string): Promise<User>;
  getUserByUserName(username: string): Promise<User>;
  existsUsername(username: string): Promise<boolean>;
  updateUser(myUser: User);
  getUsers(pagination: Pagination);


}