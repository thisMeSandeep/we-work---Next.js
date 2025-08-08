import Header from "@/components/header/Header";

export const metadata = {
  title: 'WeWork',
  description: 'Public pages layout',
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header/>
     <main className="mt-20">
       {children}
     </main>
    </div>
  );
}