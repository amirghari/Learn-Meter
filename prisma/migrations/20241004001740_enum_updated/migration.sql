/*
  Warnings:

  - The values [DONE] on the enum `Goal_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Goal` MODIFY `status` ENUM('JUST_SET', 'IN_PROGRESS', 'ACHIEVED', 'POSTPONED') NOT NULL DEFAULT 'JUST_SET';
