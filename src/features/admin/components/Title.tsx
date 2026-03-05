interface TitleProps {
  title: string;
  paragraph: string;
}
const Title: React.FC<TitleProps> = ({ title, paragraph }) => {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-semibold text-[#061251]">{title}</h1>
      <p className="text-[#646492]">{paragraph}</p>
    </header>
  );
};

export default Title;
