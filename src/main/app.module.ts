import { Module } from '@nestjs/common';
import { UserRepository } from '@/infra/user-repository';
import { FirestoreService } from '@/services/firestore-service';

const repositories = [UserRepository];
const services = [FirestoreService];

@Module({
  imports: [],
  providers: [...services, ...repositories],
})
export class AppModule {}
