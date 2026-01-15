export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[1700px] px-6 lg:px-10">
      {children}
    </div>
  );
}

