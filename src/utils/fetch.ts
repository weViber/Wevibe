import prisma from '@/libs/prisma';

export const getAllProjectsByUserId = async (userId: string) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
    });
    return projects;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectsByUserId = async (
  userId: string,
  projectId: number
) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: Number(projectId),
        userId,
      },
    });
    return project;
  } catch (error) {
    console.log(error);
  }
};
