interface OptionTitleProps {
  title: string;
  necessary?: boolean;
}
const OptionTitle: React.FC<OptionTitleProps> = ({ title, necessary }) => {
  return (
    <h2 className="text-xl font-semibold">
      {title}
      {necessary && <span className="text-red-600">*</span>}
    </h2>
  );
};

export default OptionTitle;
