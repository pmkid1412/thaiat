import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Strikethrough } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TiptapEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[160px] border rounded-md p-3 focus:outline-none prose prose-sm max-w-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="border rounded-md p-1 flex gap-1 bg-muted">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
      </div>

      {/* Body */}
      <EditorContent editor={editor} />
    </div>
  );
}
