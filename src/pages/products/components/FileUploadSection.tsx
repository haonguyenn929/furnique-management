import { FileUpload } from 'react-material-file-upload'
import { InformationContainer, TitleText } from '../addProduct/AddProduct.styled'

interface ImageUploadSectionProps {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  maxFiles: number
  maxSize: number
  is3D?: boolean
}

const FileUploadSection = ({ files, setFiles, maxFiles, maxSize, is3D }: ImageUploadSectionProps) => {
  return (
    <>
      <InformationContainer>
        <TitleText>{is3D ? '3D Model' : 'Images'}</TitleText>
        <FileUpload
          sx={{
            width: '88%',
            height: '180px',
            border: '1px dashed',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: '20px',
            '.MuiButtonBase-root': {
              color: 'var(--primary-color)',
              backgroundColor: 'var(--primary-light-color)',
              '&:hover': {
                color: 'var(--white-color)',
                backgroundColor: 'var(--primary-color)'
              }
            },
            '.MuiButtonBase-root.MuiChip-root': {
              backgroundColor: 'white',
              '&:hover': {
                color: 'var(--gray-color)'
              }
            },
            '.MuiButtonBase-root.MuiChip-root .MuiChip-icon': {
              color: 'var(--primary-color)'
            }
          }}
          value={files}
          onChange={setFiles}
          maxFiles={maxFiles}
          maxSize={maxSize}
          accept={
            is3D
              ? {
                  'model/gltf-binary': ['.glb']
                }
              : {
                  'image/png': ['.png'],
                  'image/jpeg': ['.jpg', '.jpeg']
                }
          }
          title={`Drag and drop files here or click to browse`}
          buttonText='Upload'
        />
      </InformationContainer>
    </>
  )
}

export default FileUploadSection
