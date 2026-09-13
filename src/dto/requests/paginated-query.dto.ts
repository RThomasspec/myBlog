import { isNumber } from '@nestjs/common/internal';
import { PaginatedQueryData } from '../schema/paginated-query.schema';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginatedQueryDto {
  page: number;
  private pageSize: number = 10;
  sortBy?: string;
  sortDirection: SortDirection;

  constructor(data: PaginatedQueryData) {
    this.page = data.page;
    this.sortBy = data.sortBy;
    this.sortDirection = data.sortDirection;
  }

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
