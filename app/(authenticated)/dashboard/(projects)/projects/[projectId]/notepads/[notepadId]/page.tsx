export default function NotepadPage({
  params,
}: {
  params: { projectId: string; notepadId: string };
}) {
  console.log(params);
  return (
    <>
      <h2>{`</NotepadPage>`}</h2>
      <p>{`ID del proyecto: ${params.projectId}`}</p>
      <p>{`ID del bloc de notas: ${params.notepadId}`}</p>
    </>
  );
}
