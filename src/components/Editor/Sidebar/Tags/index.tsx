import _uniq from 'lodash/uniq'

import { IconHashTag24, Tag } from '~/components'
import {
  SearchSelectDialog,
  SearchSelectNode,
} from '~/components/Dialogs/SearchSelectDialog'

import Box from '../Box'
import styles from './styles.css'

import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

interface AddTagsProps {
  tags: DigestTag[]
  onEdit: (tag: DigestTag[]) => any
  saving?: boolean
  disabled?: boolean
}

const AddTags = ({ tags, onEdit, saving, disabled }: AddTagsProps) => {
  return (
    <SearchSelectDialog
      title="addTag"
      hint="hintAddTag"
      searchType="Tag"
      onSave={(nodes: SearchSelectNode[]) => onEdit(nodes as DigestTag[])}
      nodes={tags}
      saving={saving}
      creatable
    >
      {({ open: openAddMyArticlesDialog }) => (
        <Box
          icon={<IconHashTag24 size="md" />}
          title="addTag"
          onClick={openAddMyArticlesDialog}
          disabled={disabled}
        >
          {tags.length > 0 && (
            <ul>
              {tags.map((tag) => (
                <li key={tag.id}>
                  <Tag tag={tag} type="inline" disabled />
                </li>
              ))}

              <style jsx>{styles}</style>
            </ul>
          )}
        </Box>
      )}
    </SearchSelectDialog>
  )
}

export default AddTags
