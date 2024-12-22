// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

interface IProps {
  onChange: Function;
  html: string;
}

function WYSIWYG({ onChange, html }: IProps) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        removePlugins: ['ImageUpload', 'EasyImage']
      }}
      data={html}
      onChange={(event:any, editor:any) => {
        const data = editor.getData()
        onChange(data)
      }}
    />
  )
}

export default WYSIWYG
