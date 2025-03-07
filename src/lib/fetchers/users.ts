"use server";
import { getServerSession } from "next-auth";
import authOptions from "../auth";
import { db } from "../db";
import getCurrentUser from "../session";

export async function getUser() {
  const session = await getServerSession(authOptions);
  return await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
}

export async function getUserByDomain(domain: string) {
  return await db.user.findFirst({
    where: {
      OR: [
        {
          domain,
        },
        {
          username: domain,
        },
      ],
    },
    omit: {
      email: true,
      emailVerified: true,
      lsVariantId: true,
      lsCurrentPeriodEnd: true,
      lsId: true,
      createdAt: true,
      updatedAt: true,
      password: true,
    },
  });
}

export async function getUserById({
  id,
  username,
}: {
  id?: string;
  username?: string;
}) {
  return await db.user.findFirst({
    where: {
      id: id,
      username: username,
    },
  });
}

export async function getAllUserDomains() {
  return await db.user.findMany({
    select: {
      username: true,
      domain: true,
    },
  });
}

export async function getWorkExperiences() {
  const user = await getCurrentUser();
  return await db.workExperience.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      from: "desc",
    },
  });
}

export async function getWorkExperiencesByUser(userId: string) {
  return await db.workExperience.findMany({
    where: {
      userId,
    },
    orderBy: {
      from: "desc",
    },
  });
}
