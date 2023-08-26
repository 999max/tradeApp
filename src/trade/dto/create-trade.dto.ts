import { IsInt, IsNotEmpty, IsIn } from 'class-validator';

export class CreateTradeDto {
  @IsInt()
  readonly size: number;

  @IsIn([1, 2])
  readonly side: number; // 1 - long, 2 - short

  @IsInt()
  readonly security: number;

  @IsNotEmpty()
  readonly client: string;
}
