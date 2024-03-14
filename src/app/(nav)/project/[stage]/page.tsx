import ProjectContainer from '@/components/project/ProjectContainer';
import { authOptions } from '@/libs/next-auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { stage: string } }) {
  const session = await getServerSession(authOptions);
  const stage = params.stage;

  if (!session?.user.userId) return redirect('/login');

  return (
    <ProjectContainer userId={session?.user.userId} stage={Number(stage)} />
  );
}
