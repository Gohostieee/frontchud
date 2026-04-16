import { redirect } from "next/navigation";

export default function InitiateCharacterPage() {
  redirect("/characters/new");
}
