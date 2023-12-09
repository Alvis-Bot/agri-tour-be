import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({
        example: 'Admin',
        description: 'The name of the role',
    })
    name: string;
}
