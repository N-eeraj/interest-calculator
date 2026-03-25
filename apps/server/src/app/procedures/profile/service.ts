import fs from "fs/promises";
import path from "path";
import { eq } from "drizzle-orm";

import {
  ProfileUpdateSchema,
  ProfilePictureSchema,
} from "@app/schemas/profile";

import { db } from "#db/index";
import users from "#db/schemas/users";

const PUBLIC_PATH = "storage/files/public" as const;
export default class ProfileService {
  private static PROFILE_PICTURE_STORAGE_DIR = `profile-pictures` as const;

  static async update(userId: number, { name, email }: ProfileUpdateSchema) {
    await db
      .update(users)
      .set({
        name,
        email,
      })
      .where(eq(users.id, userId));
  }

  private static async deleteCurrentProfilePicture(userId: number) {
    const [user] = await db
      .select({
        avatarPath: users.avatarUrl,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (user.avatarPath) {
      fs.rm(user.avatarPath);
    }
  }

  static async pictureUpdate(userId: number, file: ProfilePictureSchema) {
    await this.deleteCurrentProfilePicture(userId);

    const fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
    await fs.mkdir(`${PUBLIC_PATH}/${this.PROFILE_PICTURE_STORAGE_DIR}`, { recursive: true });
    const avatarUrl = `${this.PROFILE_PICTURE_STORAGE_DIR}/${userId}.${fileExtension}`;
    const filePath = path.join(PUBLIC_PATH, avatarUrl);
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.writeFile(filePath, buffer);

    try {
      await db
        .update(users)
        .set({
          avatarUrl,
        })
        .where(eq(users.id, userId));
    } catch (error) {
      fs.rm(filePath);
    }
  }

  static async pictureDelete(userId: number) {
    await this.deleteCurrentProfilePicture(userId);
  }
}
