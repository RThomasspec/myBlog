import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { createArticleSchema } from './dto/create-article.dto';
import type { UpdateArticleDto } from './dto/update-article.dto';

import type { CreateArticleDto } from './dto/create-article.dto';
import { updateArticleSchema } from './dto/update-article.dto';
import { ArticleSchema } from './schemas/article.schema';
import { PaginatedQueryDto } from 'src/dto/requests/paginated-query.dto';
import { paginatedQuerySchema } from 'src/dto/schema/paginated-query.schema';

@Controller('article')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}

  @Post()
  create(
    @Body({ schema: createArticleSchema })
    createArticleDto: CreateArticleDto,
  ) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll(@Query() query: PaginatedQueryDto) {
    return this.articlesService.findAll(query);
  }

  @Get(':articleId')
  findOne(@Param('articleId') articleId: string) {
    return this.articlesService.findOne(articleId);
  }

  @Patch(':articleId')
  update(
    @Param('articleId') articleId: string,
    @Body({ schema: updateArticleSchema }) updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(articleId, updateArticleDto);
  }

  @Delete(':articleId')
  remove(@Param('articleId') articleId: string) {
    return this.articlesService.remove(articleId);
  }
}
