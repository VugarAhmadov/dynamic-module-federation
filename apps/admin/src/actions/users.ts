"use server";

import { revalidatePath } from "next/cache";

import db from "../libs/db";

export async function updateUserRemotes(
  userId: number,
  remoteIds: Array<number>
) {
  try {
    const userWithRemotes = await db.user.findUnique({
      where: { id: userId },
      select: {
        remotes: {
          select: {
            remoteId: true, // Only get the remoteId for comparison
          },
        },
      },
    });

    const currentRemoteIds =
      userWithRemotes?.remotes.map((r) => r.remoteId) || [];

    // Calculate remotes to disconnect (currently connected but not in the new list)
    const remotesToDisconnect = currentRemoteIds.filter(
      (id) => !remoteIds.includes(id)
    );

    // Calculate remotes to connect (not currently connected but in the new list)
    const remotesToConnect = remoteIds.filter(
      (id) => !currentRemoteIds.includes(id)
    );

    // Perform the update with createMany and deleteMany
    await db.user.update({
      where: { id: userId },
      data: {
        remotes: {
          createMany: {
            data: remotesToConnect.map((remoteId) => ({
              remoteId,
            })),
          },
          deleteMany: {
            OR: remotesToDisconnect.map((remoteId) => ({
              userId,
              remoteId,
            })),
          },
        },
      },
    });
    revalidatePath("/users");
  } catch (error) {
    throw new Error(`Failed to update user remotes: ${(error as any).message}`);
  }
}
