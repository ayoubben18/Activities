import { useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropZone from "./PhotoWidgetDropZone";
interface Props {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
}
const PhotoUploadWidget = ({ uploadPhoto, loading }: Props) => {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob: any) => uploadPhoto(blob));
    }
  };
  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
  return (
    <Grid>
      <Grid.Column width={4}>
        {" "}
        <Header sub color="teal" content="Step 1 - Add Photo" />
        <PhotoWidgetDropZone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        {" "}
        <Header sub color="teal" content="Step 2 - Resize" />
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        {" "}
        <Header sub color="teal" content="Step 3 - Preview & upload" />
        {files && files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, overflow: "hidden" }}
            />
            <Button.Group>
              <Button
                onClick={onCrop}
                positive
                icon="check"
                disabled={loading}
              />
              <Button
                onClick={() => setFiles([])}
                icon="close"
                disabled={loading}
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default PhotoUploadWidget;
