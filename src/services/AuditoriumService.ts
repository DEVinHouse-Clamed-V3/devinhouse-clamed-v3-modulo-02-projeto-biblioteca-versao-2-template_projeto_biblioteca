import { Repository } from "typeorm";
import { Auditorium } from "../entities/Auditorio";
import { AppDataSource } from "../database/data-source";

export class AuditoriumService {
  private repository: Repository<Auditorium>;

  constructor() {
    this.repository = AppDataSource.getRepository(Auditorium);
  }

  async create(data: Partial<Auditorium>) {
    const auditorium = this.repository.create(data);
    await this.repository.save(auditorium);
    return auditorium;
  }

  async findAll(name?: string, capacity?: number) {
    const query = this.repository.createQueryBuilder("auditorium");

    if (name) {
      query.andWhere("auditorium.name ILIKE :name", { name: `%${name}%` });
    }

    if (capacity) {
      query.andWhere("auditorium.capacity >= :capacity", { capacity });
    }

    return query.getMany();
  }

  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, data: Partial<Auditorium>) {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }

  async findPremiumAuditoriums() {
    return this.repository.find({
      where: {
        capacity: 300,
        has_projector: true,
        has_sound_system: true,
      },
    });
  }
}
