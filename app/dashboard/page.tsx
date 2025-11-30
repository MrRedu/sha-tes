import { EmptyNotes } from '@/components/organisms/empty-notes';

export default function DashboardPage() {
  // Notes.length > 0;
  const ARE_ANY_NOTES = false;

  if (ARE_ANY_NOTES) {
    return <div>Dashboard with notes</div>;
  }

  return (
    <>
      <EmptyNotes />
    </>
  );
}
