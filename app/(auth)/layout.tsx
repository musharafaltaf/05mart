export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: "black", minHeight: "100vh" }}>
      {children}
    </div>
  );
}