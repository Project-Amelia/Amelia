import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm';
import { DiscordUser } from './DiscordUser';

@Entity({ name: 'userstats' })
export class UserStats extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  hugCount: number;

  @Column()
  kissCount: number;

  @Column()
  cryCount: number;

  @Column()
  patCount: number;

  @Column()
  punchCount: number;

  @Column()
  pokeCount: number;

  @Column()
  slapCount: number;

  @Column()
  superStaffCount: number;

  @OneToOne(
    () => DiscordUser,
    (discordUser: DiscordUser) => discordUser.userStats
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  discordUser: DiscordUser;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
