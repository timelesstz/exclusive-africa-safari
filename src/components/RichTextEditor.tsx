'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading,
  Undo,
  Redo,
} from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const toggleStyle = (isActive: boolean) =>
    `p-2 ${
      isActive
        ? 'bg-gray-200 text-gray-900'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    } rounded-lg transition-colors`

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-white p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={toggleStyle(editor.isActive('bold'))}
          title="Bold"
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={toggleStyle(editor.isActive('italic'))}
          title="Italic"
        >
          <Italic className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={toggleStyle(editor.isActive('bulletList'))}
          title="Bullet List"
        >
          <List className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={toggleStyle(editor.isActive('orderedList'))}
          title="Numbered List"
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={toggleStyle(editor.isActive({ textAlign: 'left' }))}
          title="Align Left"
        >
          <AlignLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={toggleStyle(editor.isActive({ textAlign: 'center' }))}
          title="Align Center"
        >
          <AlignCenter className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={toggleStyle(editor.isActive({ textAlign: 'right' }))}
          title="Align Right"
        >
          <AlignRight className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={toggleStyle(editor.isActive('heading', { level: 2 }))}
          title="Heading"
        >
          <Heading className="w-5 h-5" />
        </button>
        <div className="flex-grow" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 ${
            editor.can().undo()
              ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              : 'text-gray-300 cursor-not-allowed'
          } rounded-lg transition-colors`}
          title="Undo"
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 ${
            editor.can().redo()
              ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              : 'text-gray-300 cursor-not-allowed'
          } rounded-lg transition-colors`}
          title="Redo"
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="bg-white p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
} 