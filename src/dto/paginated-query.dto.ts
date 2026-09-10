import { isNumber } from '@nestjs/common/internal';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
export class PaginatedQueryDto {
  private page: number;
  private pageSize: number = 10;
  sortBy?: string;

  private sortDirection: SortDirection = SortDirection.DESC;

  private get toMongoDbSortDirection() {
    return this.sortDirection === SortDirection.ASC ? 1 : -1;
  }

  get toMongoDbSort(): { [key: string]: -1 | 1 } {
    return this.sortBy
      ? { [this.sortBy]: this.toMongoDbSortDirection }
      : { _id: this.toMongoDbSortDirection };
  }

  get skip() {
    return (this.page - 1) * this.pageSize;
  }

  get limit() {
    return this.pageSize;
  }
}
