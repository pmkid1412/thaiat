import { memo } from "react";

import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";
import { MaximizeIcon } from "@/components/tiptap-icons/maximize-icon";
import { MinimizeIcon } from "@/components/tiptap-icons/minimize-icon";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent,
} from "@/components/tiptap-ui/color-highlight-popover";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import {
  LinkButton,
  LinkContent,
  LinkPopover,
} from "@/components/tiptap-ui/link-popover";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

export interface ToolbarContentProps {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
  enableFullscreen?: boolean;
}

export interface MobileToolbarProps {
  type: "highlighter" | "link";
  onBack: () => void;
}

export const MainToolbarContent = memo(
  ({
    onHighlighterClick,
    onLinkClick,
    isMobile,
    isFullscreen,
    onFullscreenToggle,
    enableFullscreen,
  }: ToolbarContentProps) => {
    return (
      <>
        <Spacer />

        {enableFullscreen && (
          <ToolbarGroup>
            <Button
              data-style="ghost"
              onClick={onFullscreenToggle}
              title={
                isFullscreen
                  ? "Thoát chế độ toàn màn hình"
                  : "Vào chế độ toàn màn hình"
              }
            >
              {isFullscreen ? (
                <MinimizeIcon className="tiptap-button-icon" />
              ) : (
                <MaximizeIcon className="tiptap-button-icon" />
              )}
            </Button>
          </ToolbarGroup>
        )}

        {enableFullscreen && <ToolbarSeparator />}

        <ToolbarGroup>
          <UndoRedoButton action="undo" />
          <UndoRedoButton action="redo" />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
          <ListDropdownMenu
            types={["bulletList", "orderedList", "taskList"]}
            portal={isMobile}
          />
          <BlockquoteButton />
          <CodeBlockButton />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="strike" />
          <MarkButton type="code" />
          <MarkButton type="underline" />
          {!isMobile ? (
            <ColorHighlightPopover />
          ) : (
            <ColorHighlightPopoverButton onClick={onHighlighterClick} />
          )}
          {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <MarkButton type="superscript" />
          <MarkButton type="subscript" />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <TextAlignButton align="left" />
          <TextAlignButton align="center" />
          <TextAlignButton align="right" />
          <TextAlignButton align="justify" />
        </ToolbarGroup>

        <Spacer />

        {isMobile && <ToolbarSeparator />}
      </>
    );
  },
);

MainToolbarContent.displayName = "MainToolbarContent";

export const MobileToolbarContent = memo(
  ({ type, onBack }: MobileToolbarProps) => (
    <>
      <ToolbarGroup>
        <Button data-style="ghost" onClick={onBack}>
          <ArrowLeftIcon className="tiptap-button-icon" />
          {type === "highlighter" ? (
            <HighlighterIcon className="tiptap-button-icon" />
          ) : (
            <LinkIcon className="tiptap-button-icon" />
          )}
        </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      {type === "highlighter" ? (
        <ColorHighlightPopoverContent />
      ) : (
        <LinkContent />
      )}
    </>
  ),
);

MobileToolbarContent.displayName = "MobileToolbarContent";
