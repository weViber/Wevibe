import { supabaseClient } from '@/utils/supabase';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

const supabase = supabaseClient;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

type ImageChangeModalProps = {
  userId: string;
  isOpen: boolean;
  onRequestClose: () => void;
};

const ImageChangeModal = ({
  userId,
  isOpen,
  onRequestClose,
}: ImageChangeModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { data: session, update: sessionUpdate } = useSession();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      const randomFileName =
        uuidv4() + '.' + selectedFile.name.split('.').pop();
      const filePath = `${supabaseUrl}/storage/v1/object/public/profile-images/${userId}/${randomFileName}`;
      const storageFilePath = `${userId}/${randomFileName}`;
      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(storageFilePath, selectedFile);
      sessionUpdate({ info: filePath });
      onRequestClose();

      if (error) {
        console.error('Image upload error', error);
      } else {
        console.log('Image uploaded successfully');
        // MySQL에 이미지 경로 저장
        await axios.post(`/api/auth/change-image/${userId}`, {
          userId,
          image: filePath,
        });
      }
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Change Modal"
      ariaHideApp={false}
      className={
        ' relative top-24  mx-auto mt-6 w-6/12  flex-col items-center justify-center rounded-xl border border-slate-300 bg-white lg:w-[70%] 2sm:w-[95%] '
      }
    >
      <div className=" mx-auto mb-4 mt-10 flex w-6/12  items-center justify-center sm:w-9/12 lg:w-8/12">
        {previewUrl ? (
          <Image
            className="max-h-[550px]  2sm:max-h-[440px]"
            src={previewUrl}
            alt="Preview"
          />
        ) : (
          <Image src={session?.user.image!} alt="userImage" />
        )}
      </div>
      <div className="m-4 flex justify-around py-4 ">
        <div className=" relative mt-1.5 h-[36px] w-[80px] overflow-hidden  text-white">
          {/* <img src="/Icon/Icon-open.jpg" className=" p-0 pl-1" alt="open" /> */}
          <input
            type="file"
            className="mt-0.5 h-auto cursor-pointer "
            onChange={handleFileChange}
          />
        </div>
        <div className="flex gap-3 ">
          <button
            className="my-4 mb-3 block rounded-lg border-2 bg-[#f2f4ff] p-2 px-4 font-bold  text-[#8D8D8D]"
            onClick={handleUploadClick}
          >
            저장
          </button>
          <button
            className='-my-4 mb-3 block rounded-lg border-2 p-2 px-4  font-bold text-[#8D8D8D]'
            onClick={() => onRequestClose()}
          >
            닫기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageChangeModal;
