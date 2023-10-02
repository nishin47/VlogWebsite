import { Label } from "semantic-ui-react";



interface Props {

  filename: string;
}


export default function DocumentViewer(props: Props) {

  const file_url = `/assets/documents/${props.filename}.html`;
  const docxFilePath = `/assets/documents/${props.filename}.docx`;

  const handleDownload = () => {
    window.location.href = docxFilePath;
  };

  return (


    <div>
        <Label  as='a' onClick={handleDownload} style={{float:'right'}} color='teal' size='huge'>
               Download
            </Label>
 
    <iframe
      src={file_url}
      title="Document"
      width="100%"
      height="500px"
    />
  </div>
  );
}




