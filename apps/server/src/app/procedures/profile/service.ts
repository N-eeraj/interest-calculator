import fs from "fs/promises";
import path from "path";
import { eq } from "drizzle-orm";

import {
  ProfileUpdateSchema,
  ProfilePictureSchema,
} from "@app/schemas/profile";

import { db } from "#db/index";
import users from "#db/schemas/users";
import {
  APP_URL,
  PUBLIC_PATH,
} from "#server/config";

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
      await db
      .update(users)
      .set({
        avatarUrl: null,
      })
      .where(eq(users.id, userId));

      if (user.avatarPath.startsWith(APP_URL)) {
        const filePath = path.join(PUBLIC_PATH, user.avatarPath.replace(`${APP_URL}/`, ""));
        fs.rm(filePath);
      }
    }
  }

  static async pictureUpdate(userId: number, file: ProfilePictureSchema) {
    await this.deleteCurrentProfilePicture(userId);

    const fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
    await fs.mkdir(`${PUBLIC_PATH}/${this.PROFILE_PICTURE_STORAGE_DIR}`, { recursive: true });
    const fileName = Date.now() + userId;
    const avatarUrl = `${this.PROFILE_PICTURE_STORAGE_DIR}/${fileName}.${fileExtension}`;
    const filePath = path.join(PUBLIC_PATH, avatarUrl);
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.writeFile(filePath, buffer);

    try {
      await db
        .update(users)
        .set({
          avatarUrl: `${APP_URL}/${avatarUrl}`,
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
