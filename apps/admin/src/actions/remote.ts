"use server";

import { revalidatePath } from "next/cache";

import { IUserRemote } from "@admin/types";
import db from "../libs/db";

export async function toggleRemoteActiveStatus(
  remoteId: number,
  isActive: boolean
) {
  try {
    await db.remote.update({
      where: { id: remoteId },
      data: { isActive },
    });
    revalidatePath("/remotes");
  } catch (error) {
    throw new Error("Failed to update remote status");
  }
}
type CreateOrEditType = Omit<IUserRemote, "id"> & {
  id: null | number;
};
export async function createOrUpdateRemote({
  id,
  ...values
}: CreateOrEditType) {
  try {
    if (id) {
      await db.remote.update({
        where: { id },
        data: values,
      });
    } else {
      await db.remote.create({ data: values });
    }

    revalidatePath("/remotes");

    return "ok";
  } catch (error) {
    throw new Error("Failed to update remote status");
  }
}

export async function deleteRemote(id: number) {
  try {
    await db.remote.delete({
      where: { id },
    });

    revalidatePath("/remotes");

    return "ok";
  } catch (error) {
    throw new Error("Failed to update remote status");
  }
}
