import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './article.repository';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}
  create(createArticleDto: CreateArticleDto) {
    return this.articleRepository.createArticle(createArticleDto);
  }

  findAll() {
    return this.articleRepository.findAllArticle();
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
