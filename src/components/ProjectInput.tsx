import Input from './Input';
import Textarea from './Textarea';
import OptionSubtitle from './project/OptionSubtitle';
import OptionTitle from './project/OptionTitle';

interface ProjectInput {
  title: string;
  necessary: boolean;
  subtitle?: string;
  textarea?: string;
  placeholder?: string;
  desc?: string;
  value?: string;
  onChange: (text: string) => void;
}

const ProjectInput: React.FC<ProjectInput> = ({
  title,
  necessary,
  subtitle,
  textarea,
  placeholder,
  desc,
  value,
  onChange,
}) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <OptionTitle title={title} necessary={necessary} />
      {subtitle && <OptionSubtitle subtitle={subtitle} />}
      {!placeholder ? (
        <Textarea
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className="min-h-8 resize-none"
          defaultValue={textarea}
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder={placeholder}
        />
      )}
      {desc && <p className="ml-4 text-[13px] text-[#9e9e9e]">{desc}</p>}
    </div>
  );
};

export default ProjectInput;
