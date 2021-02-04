import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import {
  Button,
  CommentFormDialog,
  CommentFormType,
  DropdownDialog,
  IconMore16,
  Menu,
  Translate,
  ViewerContext,
} from '~/components'
import { BlockUser } from '~/components/BlockUser'

import { ADD_TOAST, TEXT } from '~/common/enums'

import CollapseComment from './CollapseComment'
import DeleteComment from './DeleteComment'
import EditButton from './EditButton'
import PinButton from './PinButton'
import UncollapseButton from './UncollapseButton'

import { DropdownActionsCommentPrivate } from './__generated__/DropdownActionsCommentPrivate'
import { DropdownActionsCommentPublic } from './__generated__/DropdownActionsCommentPublic'

interface DropdownActionsProps {
  comment: DropdownActionsCommentPublic & Partial<DropdownActionsCommentPrivate>
  type: CommentFormType
  inCard?: boolean
}

interface Controls {
  hasPin: boolean
  hasEdit: boolean
  hasDelete: boolean
  hasBlockUser: boolean
  hasCollapse: boolean
  hasUncollapse: boolean
}

interface DialogProps {
  openEditCommentDialog: () => void
  openDeleteCommentDialog: () => void
  openBlockUserDialog: () => void
  openCollapseCommentDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & Controls & DialogProps

const fragments = {
  comment: {
    public: gql`
      fragment DropdownActionsCommentPublic on Comment {
        id
        state
        content
        author {
          id
          ...BlockUserPublic
        }
        parentComment {
          id
        }
        node {
          ... on Circle {
            id
            name
            owner {
              id
            }
          }
          ... on Article {
            id
            mediaHash
            author {
              id
            }
          }
        }
        ...PinButtonComment
      }
      ${PinButton.fragments.comment}
      ${BlockUser.fragments.user.public}
    `,
    private: gql`
      fragment DropdownActionsCommentPrivate on Comment {
        id
        author {
          id
          ...BlockUserPrivate
        }
        node {
          ... on Circle {
            id
            owner {
              id
              isBlocking
            }
          }
          ... on Article {
            id
            author {
              id
              isBlocking
            }
          }
        }
      }
      ${BlockUser.fragments.user.private}
    `,
  },
}

const BaseDropdownActions = ({
  comment,
  type,
  inCard,

  hasPin,
  hasEdit,
  hasDelete,
  hasBlockUser,
  hasCollapse,
  hasUncollapse,

  openEditCommentDialog,
  openDeleteCommentDialog,
  openBlockUserDialog,
  openCollapseCommentDialog,
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {hasPin && <PinButton comment={comment} />}
      {hasEdit && <EditButton openEditCommentDialog={openEditCommentDialog} />}
      {hasDelete && (
        <DeleteComment.Button openDialog={openDeleteCommentDialog} />
      )}
      {hasBlockUser && (
        <BlockUser.Button
          user={comment.author}
          openDialog={openBlockUserDialog}
        />
      )}
      {hasCollapse && (
        <CollapseComment.Button openDialog={openCollapseCommentDialog} />
      )}
      {hasUncollapse && <UncollapseButton commentId={comment.id} />}
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content />,
        title: 'moreActions',
      }}
    >
      {({ open, ref }) => (
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor={inCard ? 'grey-lighter-active' : 'grey-lighter'}
          aria-label={TEXT.zh_hant.moreActions}
          aria-haspopup="true"
          onClick={open}
          ref={ref}
        >
          <IconMore16 color="grey" />
        </Button>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const { comment, type } = props
  const viewer = useContext(ViewerContext)
  const { isArchived, isBanned, isFrozen } = viewer

  const article =
    comment.node.__typename === 'Article' ? comment.node : undefined
  const circle = comment.node.__typename === 'Circle' ? comment.node : undefined
  const targetAuthor = article?.author || circle?.owner

  const isTargetAuthor = viewer.id === targetAuthor?.id
  const isBlocked = targetAuthor?.isBlocking
  const isCommentAuthor = viewer.id === comment.author.id
  const isActive = comment.state === 'active'
  const isAbleCollapse = isTargetAuthor && !isCommentAuthor
  const isCollapsed = comment.state === 'collapsed'
  const isDescendantComment = comment.parentComment

  const controls = {
    hasPin: !!(isTargetAuthor && isActive && !isDescendantComment),
    hasEdit: !!(isCommentAuthor && !isBlocked && (isActive || isCollapsed)),
    hasDelete: !!(isCommentAuthor && isActive),
    hasBlockUser: !isCommentAuthor,
    hasCollapse: !!(isAbleCollapse && isActive),
    hasUncollapse: !!(isAbleCollapse && isCollapsed),
  }

  const forbid = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: <Translate id="FORBIDDEN_BY_STATE" />,
        },
      })
    )
  }

  if (_isEmpty(_pickBy(controls)) || isArchived) {
    return null
  }

  return (
    <CommentFormDialog
      articleId={article?.id}
      circleId={circle?.id}
      type={type}
      commentId={comment.id}
      defaultContent={comment.content}
      title="editComment"
    >
      {({ open: openEditCommentDialog }) => (
        <DeleteComment.Dialog commentId={comment.id}>
          {({ open: openDeleteCommentDialog }) => (
            <BlockUser.Dialog user={comment.author}>
              {({ open: openBlockUserDialog }) => (
                <CollapseComment.Dialog commentId={comment.id}>
                  {({ open: openCollapseCommentDialog }) => (
                    <BaseDropdownActions
                      {...props}
                      {...controls}
                      openEditCommentDialog={
                        isBanned || isFrozen ? forbid : openEditCommentDialog
                      }
                      openDeleteCommentDialog={
                        isFrozen ? forbid : openDeleteCommentDialog
                      }
                      openBlockUserDialog={openBlockUserDialog}
                      openCollapseCommentDialog={openCollapseCommentDialog}
                    />
                  )}
                </CollapseComment.Dialog>
              )}
            </BlockUser.Dialog>
          )}
        </DeleteComment.Dialog>
      )}
    </CommentFormDialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
