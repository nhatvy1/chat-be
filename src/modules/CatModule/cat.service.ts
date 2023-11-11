import { Injectable } from '@nestjs/common';

export type Cat = { catId: number; name: string; password: string };

@Injectable()
export class CatService {
  private readonly cats = [
    {
      catId: 1,
      name: 'Tom',
      password: '1',
    },
    {
      catId: 2,
      name: 'Oggy',
      password: '12',
    },
  ];

  async findOne(name: string): Promise<Cat | undefined> {
    return this.cats.find((cat) => cat.name === name);
  }
}
