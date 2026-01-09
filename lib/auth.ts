import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 10)
}

export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pin, hash)
}

export async function getAdminSettings() {
  return prisma.adminSettings.findFirst()
}

export async function updateAdminPin(pinHash: string) {
  const existing = await prisma.adminSettings.findFirst()
  
  if (existing) {
    return prisma.adminSettings.update({
      where: { id: existing.id },
      data: { pinHash },
    })
  }
  
  return prisma.adminSettings.create({
    data: { pinHash },
  })
}

export async function checkAdminExists(): Promise<boolean> {
  const settings = await prisma.adminSettings.findFirst()
  return !!settings
}