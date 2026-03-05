interface TitleProps {
  title: string;
  paragraph: string;
}

const TitleItaic: React.FC<TitleProps> = ({ title, paragraph }) => {
  // Split the title into the last word and the rest
  const words = title.trim().split(' ');
  const lastWord = words.pop(); // Remove and get the last word
  const restOfTitle = words.join(' ');

  return (
    <header className="mb-8">
      <h1 className="text-2xl font-semibold text-[#061251]">
        {restOfTitle}{' '}
        {lastWord && <span className="italic">{lastWord}</span>}
      </h1>
      <p className="mt-2 text-[#646492]">{paragraph}</p>
    </header>
  );
};

export default TitleItaic;