import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission } from "../common/entities/permission.entity";
import { ApiException } from "../exception/api.exception";
import { ErrorCode } from "../exception/error.code";
import { GroupService } from "../group/group.service";
import { UserService } from "../user/service/user.service";
import { Service } from "../common/enum/service";




@Injectable()
export class ManagerService {
    constructor(@Inject(Service.USER_SERVICE) private userService: UserService,
        private groupService: GroupService) { }

    // async addGroupForUser(userId: string, groupId: string) {
    //     const myUser = await this.userService.getUserById(userId)
    //     if (!myUser) throw new ApiException(ErrorCode.USER_NOT_FOUND);
    //     const myGroup = await this.groupService.getGroupById(groupId)
    //     if (!myGroup) throw new ApiException(ErrorCode.GROUP_NOT_FOUND);
    //     myUser.group = myGroup;
    //     return await this.userService.updateUser(myUser);
    // }
}
