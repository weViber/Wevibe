import { cn } from '@/utils/style';

interface MessageWithAIProps {
  role: string;
  content: string;
}
const MessageWithAI: React.FC<MessageWithAIProps> = ({ role, content }) => {
  return (
    <div
      className={cn(
        'flex items-start gap-4',
        `${role === 'assistant' ? 'justify-start' : 'justify-end'}`
      )}
    >
      <div className="max-w-xs whitespace-pre-wrap rounded-lg bg-slate-200/20 px-6 py-4 shadow-md md:max-w-md lg:max-w-lg">
        {content}
      </div>
    </div>
  );
};

export default MessageWithAI;
