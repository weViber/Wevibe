interface OptionSubtitleProps {
  subtitle: string;
}
const OptionSubtitle: React.FC<OptionSubtitleProps> = ({ subtitle }) => {
  return (
    <p className="whitespace-pre-wrap text-base text-slate-700">{subtitle}</p>
  );
};

export default OptionSubtitle;
