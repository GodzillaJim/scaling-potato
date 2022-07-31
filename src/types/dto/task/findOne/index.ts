import {IsNotEmpty} from "class-validator";

export default class TaskID{
    @IsNotEmpty()
    id: string
}