import { DiscordUser } from '../entity/DiscordUser';

export default interface DiscordUserService {
  create(id: string): Promise<DiscordUser>;
}
