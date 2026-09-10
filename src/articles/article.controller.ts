import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { createArticleSchema } from './schemas/article.schema';

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
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':articleId')
  findOne(@Param('articleId') articleId: string) {
    return this.articlesService.findOne(articleId);
  }

  @Patch(':articleId')
  update(
    @Param('articleId') articleId: string,
    @Body({ schema: createArticleSchema }) updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(articleId, updateArticleDto);
  }

  @Delete(':articleId')
  remove(@Param('articleId') articleId: string) {
    return this.articlesService.remove(articleId);
  }
}
