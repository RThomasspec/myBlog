import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Injectable } from '@nestjs/common';
import { PaginatedQueryDto } from 'src/dto/requests/paginated-query.dto';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectModel(Article.name) private model: Model<ArticleDocument>,
  ) {}

  async createArticle(articleDto: CreateArticleDto) {
    return this.model.create(articleDto);
  }

  async findAllArticle(query: PaginatedQueryDto) {
    const paginatedQueryDto = new PaginatedQueryDto(query);

    const articles = await this.model
      .find()
      .sort(paginatedQueryDto.toMongoDbSort)
      .skip(paginatedQueryDto.skip)
      .limit(paginatedQueryDto.limit);

    const totalItemsCount = articles.length;

    return { articles, totalItemsCount };
  }

  async findArticle(idArticle: string) {
    return this.model.findById(idArticle);
  }

  async updateArticle(id: string, updateArticleDto: UpdateArticleDto) {
    return this.model.findByIdAndUpdate(id, updateArticleDto);
  }
  async deleteArticle(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
