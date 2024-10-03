/*
  Warnings:

  - You are about to alter the column `status` on the `Goal` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Goal` MODIFY `status` ENUM('JUST_SET', 'IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'JUST_SET';
