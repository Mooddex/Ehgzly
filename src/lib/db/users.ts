import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getUserById(userId: string) {
  const client = await clientPromise;
  const db = client.db();
  
  return await db.collection("users").findOne({ 
    _id: new ObjectId(userId) 
  });
}

export async function updateUser(userId: string, data: any) {
  const client = await clientPromise;
  const db = client.db();
  
  return await db.collection("users").updateOne(
    { _id: new ObjectId(userId) },
    { $set: { ...data, updatedAt: new Date() } }
  );
}

export async function updateUserRole(userId: string, role: string) {
  return await updateUser(userId, { role });
}

export async function deactivateUser(userId: string) {
  return await updateUser(userId, { isActive: false });
}