import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString()
    name: string;


}
