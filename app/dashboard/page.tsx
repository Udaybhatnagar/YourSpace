"use client"

import { AppSidebar } from "@/components/app-sidebar"
import Editor from "@/components/Editor"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useNotes } from "@/hooks/use-notes"
import ModeToggle from "@/components/ModeToggle"
import { getAllNotes } from "@/lib/db"
import { Download } from "lucide-react"

export default function Page() {
  const { currentNoteId, notes, updateNote } = useNotes()
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const currentNote = notes.find((n) => n.id === currentNoteId)
  const title = currentNote?.title || "New Note"

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditingTitle])

  const handleTitleClick = () => {
    setIsEditingTitle(true)
    setEditTitle(title)
  }

  const handleTitleSave = async () => {
    if (currentNoteId && editTitle.trim()) {
      await updateNote(currentNoteId, { title: editTitle.trim() })
    }
    setIsEditingTitle(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleTitleSave()
    if (e.key === "Escape") setIsEditingTitle(false)
  }

  const downloadNotes = async () => {
    const notes = await getAllNotes()
    const markdown = notes
      .map((note) => {
        const created = new Date(note.createdAt).toISOString()
        return `# ${note.title}\n\nCreated: ${created}\n\n${note.content}\n`
      })
      .join("\n\n---\n\n")

    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "notes.md"
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="bg-background">
        {/* ================= HEADER ================= */}
        <header
          className="sticky top-0 z-40 flex h-16 items-center justify-between 
          border-b bg-background/80 backdrop-blur-md px-4"
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-5" />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  {isEditingTitle ? (
                    <input
                      ref={inputRef}
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onBlur={handleTitleSave}
                      onKeyDown={handleKeyDown}
                      className="bg-transparent border-b border-muted-foreground 
                      focus:border-primary outline-none text-lg font-medium px-1"
                    />
                  ) : (
                    <BreadcrumbPage
                      onClick={handleTitleClick}
                      className="cursor-pointer text-lg font-medium 
                      hover:text-primary transition-colors"
                    >
                      {title}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadNotes}
              className="gap-2"
            >
              <Download size={16} />
              Export
            </Button>
            <ModeToggle />
          </div>
        </header>

        {/* ================= EDITOR ================= */}
        <main className="flex-1 px-6 py-6">
          <div
            className="mx-auto max-w-4xl rounded-xl 
            bg-background shadow-sm border p-4"
          >
            <Editor />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
