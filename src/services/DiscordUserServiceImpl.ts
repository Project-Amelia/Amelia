import DiscordUserService from './DiscordUserService';
import { MSDBService } from './MSDBService';
import { DiscordUser } from '../entity/DiscordUser';
import { UserStats } from '../entity/UserStats';

export default class DiscordUserServiceImpl implements DiscordUserService {
  public async create(id: string): Promise<DiscordUser> {
    // Get repositories
    const conn = MSDBService.getConnection();
    const dbDiscordUser = conn.getRepository(DiscordUser);
    const dbUserStats = conn.getRepository(UserStats);

    // Create user
    try {
      const savedDiscordUser = await dbDiscordUser.save({ id });
      await dbUserStats.save({ id });
      return savedDiscordUser;
    } catch (ex) {
      console.log(
        `Exception while creating a discord user, message: ${ex.message}`
      );
      return null;
    }
  }
}
