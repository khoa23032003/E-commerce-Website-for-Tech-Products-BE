import { IsEmpty } from "class-validator"

export class CreateBannerDto {
    @IsEmpty()
    title: string

    @IsEmpty()
    imageUrl: string


    link?: string
}
