import useProjectPageStore from '@/libs/store/projectPageStore';
import useProjectRequestStore, {
  ProjectRequestState,
} from '@/libs/store/projectRequestStore';
import { cn } from '@/utils/style';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
interface StageButtonProps {
  userId?: string;
  stage: number;
  isNextButtonDisabled: boolean;
  className?: string;
}

type NonFunctionProperties<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
>;

type StateWithIndexSignature = {
  [key: string]: any;
};

const selectNonFunctionState = (
  state: ProjectRequestState
): NonFunctionProperties<ProjectRequestState> => {
  const newState: StateWithIndexSignature = {};
  Object.keys(state).forEach((key) => {
    if (typeof state[key as keyof ProjectRequestState] !== 'function') {
      newState[key] = state[key as keyof ProjectRequestState];
    }
  });
  return newState as NonFunctionProperties<ProjectRequestState>;
};

const ProjectStageButtonWrap: React.FC<StageButtonProps> = ({
  userId,
  stage,
  isNextButtonDisabled,
  className,
}) => {
  const router = useRouter();
  const nonFunctionState = useProjectRequestStore(selectNonFunctionState);
  const resetStore = useProjectRequestStore((state) => state.resetStore);
  const { decreasePage, increasePage, resetPage } = useProjectPageStore(
    (state) => ({
      decreasePage: state.decreasePage,
      increasePage: state.increasePage,
      resetPage: state.resetPage,
    })
  );
  return (
    <div className={cn('flex justify-between', className)}>
      <button
        className={cn(
          'rounded-full px-6 py-2 text-white',
          'bg-blue-500 hover:opacity-70',
          'transition-opacity duration-300 ease-in-out'
        )}
        onClick={() => {
          decreasePage();
          router.push(`/project/${stage - 1}`);
        }}
        disabled={stage === 1}
      >
        이전
      </button>
      {stage === 7 && userId ? (
        <button
          className={cn(
            'rounded-full px-6 py-2 text-white',
            isNextButtonDisabled
              ? 'bg-slate-500'
              : 'bg-blue-500 hover:opacity-70',
            'transition-opacity duration-300 ease-in-out'
          )}
          onClick={async () => {
            try {
              const response = await axios.post('/api/project', {
                userId,
                nonFunctionState,
              });
              if (response.status === 200) {
                toast.success('프로젝트 의뢰가 완료되었습니다');
                router.push('/');
                resetPage();
                resetStore();
              }
            } catch (error) {}
          }}
          disabled={isNextButtonDisabled}
          aria-disabled={isNextButtonDisabled}
        >
          완료
        </button>
      ) : (
        <button
          className={cn(
            'rounded-full px-6 py-2 text-white',
            isNextButtonDisabled
              ? 'bg-slate-500'
              : 'bg-blue-500 hover:opacity-70',
            'transition-opacity duration-300 ease-in-out'
          )}
          onClick={() => {
            increasePage();
            router.push(`/project/${stage + 1}`);
          }}
          disabled={isNextButtonDisabled}
          aria-disabled={isNextButtonDisabled}
        >
          다음
        </button>
      )}
    </div>
  );
};
export default ProjectStageButtonWrap;
