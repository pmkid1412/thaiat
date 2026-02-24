"use client";

import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// --- Tiptap Core Extensions ---
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Selection } from "@tiptap/extensions";
import { StarterKit } from "@tiptap/starter-kit";

// --- UI Primitives ---
import { Toolbar } from "@/components/tiptap-ui-primitive/toolbar";
import {
  MainToolbarContent,
  MobileToolbarContent,
} from "./simple-editor-toolbar";

// --- Tiptap Node ---
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Hooks ---
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint";
import { useWindowSize } from "@/hooks/use-window-size";

// --- UI Components ---
import { Dialog, DialogContent } from "@/components/ui/dialog";

// --- Components ---
// import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";
import "@/styles/_variables.scss";

// Constants
const MIN_EDITOR_HEIGHT = 200;
const MAX_EDITOR_HEIGHT = 1200;
const DEFAULT_EDITOR_HEIGHT = 500;
const RESIZE_HANDLE_HEIGHT = 12;
const FULLSCREEN_SIZE = "95vh";

interface SimpleEditorProps {
  value: string;
  onChange: (value: string) => void;
  enableFullscreen?: boolean;
  enableResize?: boolean;
  defaultHeight?: number;
}

export function SimpleEditor({
  value,
  onChange,
  enableFullscreen = true,
  enableResize = true,
  defaultHeight = DEFAULT_EDITOR_HEIGHT,
}: SimpleEditorProps) {
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main",
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorHeight, setEditorHeight] = useState(defaultHeight);
  const [isResizing, setIsResizing] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const resizeStartY = useRef(0);
  const resizeStartHeight = useRef(0);

  const editorConfig = useMemo(
    () => ({
      immediatelyRender: false,
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          "aria-label": "Main content area, start typing to enter text.",
          class: "tiptap ProseMirror simple-editor",
        },
      },
      extensions: [
        StarterKit.configure({
          horizontalRule: false,
          link: {
            openOnClick: false,
            enableClickSelection: true,
          },
        }),
        HorizontalRule,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        TaskList,
        TaskItem.configure({ nested: true }),
        Highlight.configure({ multicolor: true }),
        Image,
        Typography,
        Superscript,
        Subscript,
        Selection,
        ImageUploadNode.configure({
          accept: "image/*",
          maxSize: MAX_FILE_SIZE,
          limit: 3,
          upload: handleImageUpload,
          onError: (error) => console.error("Upload failed:", error),
        }),
      ],
    }),
    [],
  );

  const editor = useEditor({
    ...editorConfig,
    content: value,
    onUpdate: ({ editor }) => {
      // Preserve empty paragraphs for display by adding non-breaking space
      let html = editor.getHTML();
      html = html.replace(/<p><\/p>/g, "<p>&nbsp;</p>");
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor) {
      const currentHTML = editor.getHTML();
      const normalizedValue = value.replace(/<p>&nbsp;<\/p>/g, "<p></p>");
      const normalizedCurrent = currentHTML.replace(
        /<p>&nbsp;<\/p>/g,
        "<p></p>",
      );
      if (normalizedValue !== normalizedCurrent) {
        editor.commands.setContent(value, { emitUpdate: false });
      }
    }
  }, [editor, value]);

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      if (!enableResize || isFullscreen) return;
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      resizeStartY.current = e.clientY;
      resizeStartHeight.current = editorHeight;
    },
    [enableResize, isFullscreen, editorHeight],
  );

  useEffect(() => {
    if (!isResizing) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const delta = e.clientY - resizeStartY.current;
        const newHeight = Math.max(
          MIN_EDITOR_HEIGHT,
          Math.min(MAX_EDITOR_HEIGHT, resizeStartHeight.current + delta),
        );
        setEditorHeight(newHeight);
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      cancelAnimationFrame(animationFrameId);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: false });
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isResizing]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const handleHighlighterClick = useCallback(() => {
    setMobileView("highlighter");
  }, []);

  const handleLinkClick = useCallback(() => {
    setMobileView("link");
  }, []);

  const handleBackClick = useCallback(() => {
    setMobileView("main");
  }, []);

  const editorWrapperStyle = useMemo(
    () =>
      !isFullscreen
        ? {
            height: `${editorHeight + (enableResize ? RESIZE_HANDLE_HEIGHT : 0)}px`,
          }
        : undefined,
    [isFullscreen, editorHeight, enableResize],
  );

  const toolbarStyle = useMemo(
    () =>
      isMobile
        ? {
            bottom: `calc(100% - ${height - rect.y}px)`,
          }
        : undefined,
    [isMobile, height, rect.y],
  );

  const editorContent = (
    <div
      className={`simple-editor-wrapper rounded-xl border-2 ${
        isFullscreen ? "simple-editor-fullscreen" : ""
      }`}
      style={editorWrapperStyle}
    >
      <div>
        <EditorContext.Provider value={{ editor }}>
          <Toolbar
            ref={toolbarRef}
            className="shadow-xs bg-white!"
            style={toolbarStyle}
          >
            {mobileView === "main" ? (
              <MainToolbarContent
                onHighlighterClick={handleHighlighterClick}
                onLinkClick={handleLinkClick}
                isMobile={isMobile}
                isFullscreen={isFullscreen}
                onFullscreenToggle={toggleFullscreen}
                enableFullscreen={enableFullscreen}
              />
            ) : (
              <MobileToolbarContent
                type={mobileView === "highlighter" ? "highlighter" : "link"}
                onBack={handleBackClick}
              />
            )}
          </Toolbar>

          <EditorContent
            editor={editor}
            role="presentation"
            className="simple-editor-content m-0! bg-gray-50/10"
          />
        </EditorContext.Provider>
      </div>

      {enableResize && !isFullscreen && (
        <div
          className="simple-editor-resize-handle"
          onMouseDown={handleResizeStart}
        >
          <div className="simple-editor-resize-line" />
        </div>
      )}
    </div>
  );

  if (isFullscreen) {
    return (
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent
          className="min-w-[90vw] max-w-[95vw] p-0 rounded-xl gap-0"
          style={{ maxHeight: FULLSCREEN_SIZE }}
          showCloseButton={false}
        >
          {editorContent}
        </DialogContent>
      </Dialog>
    );
  }

  return editorContent;
}
