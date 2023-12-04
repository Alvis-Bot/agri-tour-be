import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber } from "class-validator";

export class CreateContactDto {

    @ApiProperty({
        description: 'The full name of the contact',
        example: 'John Doe', // Example value
    })
    fullName: string;

    @ApiProperty({
        description: 'The enterprise associated with the contact',
        example: 'ABC Company', // Example value
    })
    enterprise: string;

    @IsEmail({}, { message: 'Invalid email format' })
    @ApiProperty({
        description: 'The email address of the contact',
        example: 'john.doe@example.com', // Example value
    })
    email: string;

    @IsPhoneNumber("VN", {})
    @ApiProperty({
        description: 'The phone number of the contact',
        example: '+1234567890', // Example value
    })
    phone: string;

    @ApiProperty({
        description: 'A description of the contact',
        example: 'This is an example contact description.', // Example value
    })
    description: string;
}
