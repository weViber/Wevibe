'use client';

import { cn } from '@/utils/style';
import { Message, useChat } from 'ai/react';
import { useRef, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import MessageWithAI from './MessageWithAI';

interface ProjectChat {
  selectRoom: string;
  image?: string;
}

const ProjectChat = () => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [initialMessage, setInitialMessage] = useState<Message[]>([
    {
      id: 'assistant',
      content:
        '안녕하세요. 웹앱 설계사 위봇입니다. 웹앱에 관련된 모든 걸 물어보세요.',
      role: 'assistant',
    },
  ]);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/chat/project',
      initialMessages: initialMessage,
    });
  return (
    <div
      className={cn(
        'h-full w-[530px] border-l border-slate-400',
        'flex flex-col px-4 py-6',
        'lg:hidden'
      )}
    >
      <div
        ref={chatContainerRef}
        className="no-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-6"
      >
        {messages.map((message) => (
          <MessageWithAI
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
      </div>
      <form className="mb-8 w-full" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between rounded border border-slate-300 p-2 shadow-xl">
          <input
            className="flex-1 bg-transparent p-2 placeholder:text-gray-300 focus:outline-none"
            value={input}
            placeholder="내용을 입력하세요."
            onChange={handleInputChange}
          />
          <button type="submit" className="ml-4 p-2" disabled={isLoading}>
            <FaPaperPlane className="text-slate-300" />
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProjectChat;
