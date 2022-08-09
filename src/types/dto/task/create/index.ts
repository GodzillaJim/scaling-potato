import { IsNotEmpty } from "class-validator";

export default class TaskDTO {
  @IsNotEmpty()
  name: string;
}
