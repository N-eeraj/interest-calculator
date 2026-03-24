import { eq } from "drizzle-orm";
import { ProfileUpdateSchema } from "@app/schemas/profile";
import { db } from "#db/index";
import users from "#db/schemas/users";

export default class ProfileService {
  static async update(userId: number, { name, email }: ProfileUpdateSchema) {
    const updateData: ProfileUpdateSchema = {
      ...(name && { name }),
      ...(email && { email }),
    };

    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId));
  }
}
