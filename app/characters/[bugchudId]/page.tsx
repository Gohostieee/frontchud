import { CharacterEditor } from "../_components/character-editor";

export default async function CharacterEditorPage({
  params,
}: {
  params: Promise<{ bugchudId: string }>;
}) {
  const { bugchudId } = await params;

  return <CharacterEditor bugchudId={bugchudId} />;
}
