-- DropForeignKey
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_quizId_fkey";

-- AlterTable
ALTER TABLE "Badge" ADD COLUMN     "category" TEXT,
ADD COLUMN     "level" TEXT,
ALTER COLUMN "quizId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ExerciseSubmission" ADD COLUMN     "content" TEXT,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "score" INTEGER,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "careerChange" TEXT,
ADD COLUMN     "educationItems" JSONB,
ADD COLUMN     "goals" TEXT,
ADD COLUMN     "hobbies" TEXT,
ADD COLUMN     "jobItems" JSONB,
ADD COLUMN     "learningStats" JSONB,
ADD COLUMN     "portfolio" TEXT;

-- AddForeignKey
ALTER TABLE "ExerciseSubmission" ADD CONSTRAINT "ExerciseSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;
