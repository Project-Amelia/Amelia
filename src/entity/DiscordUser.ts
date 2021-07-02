import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserStats } from './UserStats';
import { CustomCommand } from './CustomCommand';

@Entity({ name: 'discorduser' })
export class DiscordUser extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  birthdate: Date;

  @Column()
  customCommandAllowance: number;

  @OneToOne(() => UserStats, (userStats: UserStats) => userStats.discordUser)
  userStats: UserStats;

  @OneToMany(
    () => CustomCommand,
    (customCommand: CustomCommand) => customCommand.discordUser
  )
  customCommands: CustomCommand[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
