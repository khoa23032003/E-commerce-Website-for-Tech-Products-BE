
import { IsEmpty, IsString } from "class-validator";

export class CreatePolicyDto {
    @IsEmpty()
    @IsString()
    title: string


    @IsString()
    content: string

}
