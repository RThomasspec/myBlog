import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './article.repository';
import { PaginatedQueryDto } from 'src/dto/requests/paginated-query.dto';
import { PaginationDto } from 'src/dto/responses/pagination.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}
  create(createArticleDto: CreateArticleDto) {
    return this.articleRepository.createArticle(createArticleDto);
  }

  async findAll(query: PaginatedQueryDto) {
    const { articles, totalItemsCount } =
      await this.articleRepository.findAllArticle(query);

    const pagination = new PaginationDto(query, totalItemsCount);

    return {
      data: articles,
      meta: pagination.meta,
    };
  }

  findOne(id: string) {
    return this.articleRepository.findArticle(id);
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.updateArticle(id, updateArticleDto);
  }

  remove(id: string) {
    return this.articleRepository.deleteArticle(id);
  }
}
