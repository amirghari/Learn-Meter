-- AlterTable
ALTER TABLE `Goal` MODIFY `status` ENUM('JUST_SET', 'IN_PROGRESS', 'DONE', 'POSTPONED') NOT NULL DEFAULT 'JUST_SET';
