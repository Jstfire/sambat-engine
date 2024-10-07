// src/sambatan/sambatan.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sambatan } from './sambatan.entity';
import { CreateSambatanInput } from './dto/create-sambatan.input';
import { MediaSambatan } from './media-sambatan.entity';
import { User } from 'src/users/user.entity';
import { RepostedBy } from './reposted-by.entity';
import { CommentedBy } from './commented-by.entity';

@Injectable()
export class SambatanService {
  constructor(
    @InjectRepository(Sambatan)
    private sambatanRepository: Repository<Sambatan>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(MediaSambatan)
    private mediaSambatanRepository: Repository<MediaSambatan>,
    @InjectRepository(RepostedBy)
    private repostedByRepository: Repository<RepostedBy>,
    @InjectRepository(CommentedBy)
    private commentedByRepository: Repository<CommentedBy>,
  ) {}

  async findAll(): Promise<Sambatan[]> {
    return this.sambatanRepository.find();
  }

  async create(createSambatanInput: CreateSambatanInput): Promise<Sambatan> {
    const sambatan = this.sambatanRepository.create(createSambatanInput);
    return this.sambatanRepository.save(sambatan);
  }

  // Implementasikan method lainnya
  private getMediaType(url: string): string {
    // Implementasi sederhana, Anda mungkin perlu membuatnya lebih robust
    if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
      return 'image';
    } else if (url.match(/\.(mp4|mov|avi)$/)) {
      return 'video';
    } else {
      return 'unknown';
    }
  }

  async createPost(
    userId: number,
    content: string,
    mediaUrls: string[],
  ): Promise<Sambatan> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const sambatan = new Sambatan();
    sambatan.content = content;
    sambatan.user = user;
    sambatan.created_at = new Date();
    sambatan.add_media = mediaUrls.length > 0;

    const savedSambatan = await this.sambatanRepository.save(sambatan);

    if (mediaUrls.length > 0) {
      const mediaSambatan = mediaUrls.map((url) => {
        const media = new MediaSambatan();
        media.media_url = url;
        media.typeof_media = this.getMediaType(url);
        media.sambatan = savedSambatan;
        return media;
      });

      await this.mediaSambatanRepository.save(mediaSambatan);
    }

    return savedSambatan;
  }

  async repost(userId: number, sambatanId: number): Promise<Sambatan> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const originalSambatan = await this.sambatanRepository.findOneBy({
      id: sambatanId,
    });

    if (!user || !originalSambatan) {
      throw new Error('User or Sambatan not found');
    }

    const repost = new Sambatan();
    repost.content = originalSambatan.content;
    repost.user = user;
    repost.created_at = new Date();
    repost.is_quoting = false;
    repost.quoted_sambatan_id = originalSambatan.id;

    const savedRepost = await this.sambatanRepository.save(repost);

    const repostedBy = new RepostedBy();
    repostedBy.user_reposted = user;
    repostedBy.sambatan = originalSambatan;
    await this.repostedByRepository.save(repostedBy);

    return savedRepost;
  }

  async quoteRepost(
    userId: number,
    sambatanId: number,
    quoteContent: string,
  ): Promise<Sambatan> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const originalSambatan = await this.sambatanRepository.findOneBy({
      id: sambatanId,
    });

    if (!user || !originalSambatan) {
      throw new Error('User or Sambatan not found');
    }

    const quoteRepost = new Sambatan();
    quoteRepost.content = quoteContent;
    quoteRepost.user = user;
    quoteRepost.created_at = new Date();
    quoteRepost.is_quoting = true;
    quoteRepost.quoted_sambatan_id = originalSambatan.id;

    const savedQuoteRepost = await this.sambatanRepository.save(quoteRepost);

    const repostedBy = new RepostedBy();
    repostedBy.user_reposted = user;
    repostedBy.sambatan = originalSambatan;
    await this.repostedByRepository.save(repostedBy);

    return savedQuoteRepost;
  }

  async addComment(
    userId: number,
    sambatanId: number,
    content: string,
  ): Promise<CommentedBy> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const sambatan = await this.sambatanRepository.findOneBy({
      id: sambatanId,
    });

    if (!user || !sambatan) {
      throw new Error('User or Sambatan not found');
    }

    const comment = new Sambatan();
    comment.content = content;
    comment.user = user;
    comment.created_at = new Date();

    const savedComment = await this.sambatanRepository.save(comment);

    const commentedBy = new CommentedBy();
    commentedBy.sambatan_comment = savedComment;
    commentedBy.sambatan = sambatan;

    return this.commentedByRepository.save(commentedBy);
  }
}
