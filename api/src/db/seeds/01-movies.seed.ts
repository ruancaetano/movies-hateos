import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Movie } from '../../modules/movies/movie.entity';

export default class CreateMovies implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Movie)
      .values(
        Array(100)
          .fill(0)
          .map(() => ({
            title: faker.random.words(2),
            description: faker.random.words(15),
            thumb: faker.internet.avatar(),
            duration: Number(faker.random.numeric(6)),
          })),
      )
      .execute();
  }
}
