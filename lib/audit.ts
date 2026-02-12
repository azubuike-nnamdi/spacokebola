import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export async function createAuditLog({
  userId,
  action,
  entityType,
  entityId,
  changes,
}: {
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  changes?: Prisma.InputJsonValue;
}) {
  try {
    return await prisma.auditLog.create({
      data: {
        userId,
        action,
        entityType,
        entityId,
        changes: changes ? structuredClone(changes) : undefined,
      },
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
    // We don't want to throw here as audit logging should not break the main flow
  }
}
