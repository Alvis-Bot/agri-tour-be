import { ApiProperty } from "@nestjs/swagger";


export class UpdatePermissionDto{

    @ApiProperty()
    name: string;

    @ApiProperty()
    description : string;
}