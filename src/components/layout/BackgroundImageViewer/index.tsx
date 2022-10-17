export type BackImageViewerProps = {
  src: string
}

const BackgroundImageViewer = ({ src }: BackImageViewerProps) => {
  return (
    <div
      style={{ backgroundImage: `url(${src}?fm=webp)` }}
      className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-contain bg-center bg-no-repeat"
    />
  )
}

export default BackgroundImageViewer
