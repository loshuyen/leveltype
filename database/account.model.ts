import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IAccount extends Document {
  provider: 'google' | 'github' | 'apple' | 'facebook' | string;
  providerAccountId: string;
  user: mongoose.Types.ObjectId;
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    access_token: String,
    refresh_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,
  },
  {
    timestamps: true,
  }
);

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export const Account = models.Account || model<IAccount>('Account', AccountSchema);