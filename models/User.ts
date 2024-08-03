import mongoose, { Schema, Document, Model } from "mongoose";

// Define a TypeScript interface for User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  provider?: string;
}

// Define the Mongoose Schema for User
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  provider: { type: String },
});

// Create the User model using the IUser interface
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
