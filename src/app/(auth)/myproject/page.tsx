import MyProjectList from '@/components/MyProjectList';
import { authOptions } from '@/libs/next-auth';
import { getAllProjectsByUserId } from '@/utils/fetch';
import { getServerSession } from 'next-auth';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user.userId) return null;

  const projects = await getAllProjectsByUserId(session?.user.userId);

  if (!projects) return null;

  return <MyProjectList projects={projects} />;
}
