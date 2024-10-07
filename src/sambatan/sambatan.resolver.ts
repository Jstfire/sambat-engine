// src/sambatan/sambatan.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Sambatan } from './sambatan.entity';
import { SambatanService } from './sambatan.service';
import { CreateSambatanInput } from './dto/create-sambatan.input';
import { CommentedBy } from './commented-by.entity';

@Resolver(() => Sambatan)
export class SambatanResolver {
  constructor(private sambatanService: SambatanService) {}

  @Query(() => [Sambatan])
  async sambatans(): Promise<Sambatan[]> {
    return this.sambatanService.findAll();
  }

  @Mutation(() => Sambatan)
  async createSambatan(
    @Args('createSambatanInput') createSambatanInput: CreateSambatanInput,
  ): Promise<Sambatan> {
    return this.sambatanService.create(createSambatanInput);
  }

  // Implementasikan query dan mutation lainnya
  @Mutation(() => Sambatan)
  async createPost(
    @Args('userId') userId: number,
    @Args('content') content: string,
    @Args('mediaUrls', { type: () => [String], nullable: true })
    mediaUrls: string[],
  ): Promise<Sambatan> {
    return this.sambatanService.createPost(userId, content, mediaUrls || []);
  }

  @Mutation(() => Sambatan)
  async repost(
    @Args('userId') userId: number,
    @Args('sambatanId') sambatanId: number,
  ): Promise<Sambatan> {
    return this.sambatanService.repost(userId, sambatanId);
  }

  @Mutation(() => Sambatan)
  async quoteRepost(
    @Args('userId') userId: number,
    @Args('sambatanId') sambatanId: number,
    @Args('quoteContent') quoteContent: string,
  ): Promise<Sambatan> {
    return this.sambatanService.quoteRepost(userId, sambatanId, quoteContent);
  }

  @Mutation(() => CommentedBy)
  async addComment(
    @Args('userId') userId: number,
    @Args('sambatanId') sambatanId: number,
    @Args('content') content: string,
  ): Promise<CommentedBy> {
    return this.sambatanService.addComment(userId, sambatanId, content);
  }
}
