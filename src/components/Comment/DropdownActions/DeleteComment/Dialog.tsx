import gql from 'graphql-tag'

import { Dialog, Translate, useDialogSwitch, useMutation } from '~/components'

import { ADD_TOAST } from '~/common/enums'

import { DeleteComment } from './__generated__/DeleteComment'

const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      id
      state
    }
  }
`

interface DeleteCommentDialogProps {
  commentId: string
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DeleteCommentDialog = ({
  commentId,
  children,
}: DeleteCommentDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  const [deleteComment] = useMutation<DeleteComment>(DELETE_COMMENT, {
    variables: { id: commentId },
    optimisticResponse: {
      deleteComment: {
        id: commentId,
        state: 'archived' as any,
        __typename: 'Comment',
      },
    },
  })

  const onDelete = async () => {
    await deleteComment()

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate zh_hant="評論已刪除" zh_hans="评论已删除" />,
          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} size="sm">
        <Dialog.Header title="deleteComment" close={close} mode="inner" />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="確認刪除評論，評論會馬上消失。"
              zh_hans="确认删除评论，评论会马上消失。"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onDelete()
              close()
            }}
          >
            <Translate id="confirm" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate id="cancel" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

const LazyDeleteCommentDialog = (props: DeleteCommentDialogProps) => (
  <Dialog.Lazy mounted={<DeleteCommentDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

export default LazyDeleteCommentDialog
