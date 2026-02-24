import { useCallback, useState } from "react"
import { type Editor } from "@tiptap/react"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Icons ---
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon"

// --- Tiptap UI ---
import { ListButton, type ListType } from "@/components/tiptap-ui/list-button"

import { useListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu/use-list-dropdown-menu"

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button, ButtonGroup } from "@/components/tiptap-ui-primitive/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Card, CardBody } from "@/components/tiptap-ui-primitive/card"

export interface ListDropdownMenuProps extends Omit<ButtonProps, "type"> {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor
  /**
   * The list types to display in the dropdown.
   */
  types?: ListType[]
  /**
   * Whether the dropdown should be hidden when no list types are available
   * @default false
   */
  hideWhenUnavailable?: boolean
  /**
   * Callback for when the dropdown opens or closes
   */
  onOpenChange?: (isOpen: boolean) => void
  /**
   * Whether to render the dropdown menu in a portal
   * @default false
   */
  portal?: boolean
}

export function ListDropdownMenu({
  editor: providedEditor,
  types = ["bulletList", "orderedList", "taskList"],
  hideWhenUnavailable = false,
  onOpenChange,
  portal = false,
  ...props
}: ListDropdownMenuProps) {
  const { editor } = useTiptapEditor(providedEditor)
  const [isOpen, setIsOpen] = useState(false)

  const { filteredLists, canToggle, isActive, isVisible, Icon } =
    useListDropdownMenu({
      editor,
      types,
      hideWhenUnavailable,
    })

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      onOpenChange?.(open)
    },
    [onOpenChange]
  )

  if (!isVisible) {
    return null
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOnOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          data-active-state={isActive ? "on" : "off"}
          role="button"
          tabIndex={-1}
          disabled={!canToggle}
          data-disabled={!canToggle}
          aria-label="Tùy chọn danh sách"
          tooltip="Danh sách"
          {...props}
        >
          <Icon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-0! overflow-hidden bg-transparent! rounded-xl">
        <Card>
          <CardBody>
            <ButtonGroup>
              {filteredLists.map((option) => (
                <ListButton
                  key={option.type}
                  editor={editor}
                  type={option.type}
                  text={option.label}
                  showTooltip={false}
                  onToggled={() => setIsOpen(false)}
                />
              ))}
            </ButtonGroup>
          </CardBody>
        </Card>
      </PopoverContent>
    </Popover>
  )
}

export default ListDropdownMenu
