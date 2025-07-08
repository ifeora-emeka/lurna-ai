import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

export class Wallet extends Model {
  declare id: number;
  declare userId: string;
  declare tier: number;
  declare totalBalance: number;
}

Wallet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'user_id',
    },
    tier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalBalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      field: 'total_balance',
    },
  },
  {
    sequelize,
    tableName: 'wallets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Wallet.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Wallet;
