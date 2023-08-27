import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Security } from './security.entity';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(Security)
    private securityRepository: Repository<Security>,
  ) {}

  async findAllLimited(count = 20): Promise<Security[]> {
    if (count > 20) count = 20;
    return this.securityRepository.find({ take: count });
  }

  async findById(id: number): Promise<Security> {
    return this.securityRepository.findOneBy({ id });
  }

  async create(security: Omit<Security, 'id'>): Promise<Security> {
    return await this.securityRepository.save(security);
  }

  async removeAll(): Promise<void> {
    await this.securityRepository.clear();
    // reset id
    await this.securityRepository.query(
      'ALTER SEQUENCE security_id_seq RESTART WITH 1',
    );
  }
}
