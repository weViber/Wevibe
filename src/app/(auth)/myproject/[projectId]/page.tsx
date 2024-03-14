import MyProject from '@/components/MyProject';
import { authOptions } from '@/libs/next-auth';
import { getProjectsByUserId } from '@/utils/fetch';
import { getServerSession } from 'next-auth';

interface PageProps {
  params: {
    projectId: number;
  };
}
export default async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user.userId) return null;

  const project = await getProjectsByUserId(
    session?.user.userId,
    params.projectId
  );

  if (!project) return null;

  return <MyProject project={project} />;
}
