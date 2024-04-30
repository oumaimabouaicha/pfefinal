import React, { useState } from 'react';
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import {useDispatch,useSelector} from "react-redux";
import {updateCategorie} from "../../../features/categorieslice"
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const Editcategorie = ({show,handleClose,cat}) => {
  const dispatch = useDispatch();
   const [categorie,setCategorie]=useState(cat)
  const [files, setFiles] = useState([]);
 const [validated, setValidated] = useState(false);
 
useEffect(() => {
  
  setFiles( [
    {
      source: categorie.imagecategorie,
      options: { type: 'local' }
    }
    ])

}, [dispatch])


const handlechange=(e)=>{
  
    setCategorie({...categorie,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
   	
    //faire le add dans la BD
    dispatch(updateCategorie(categorie))
    
    setFiles([])
    handleClose()
    setValidated(false);
    
    }
    setValidated(true);
    }
    

  
    const serverOptions = () => { console.log('server pond');

    return {
      
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(function(response) {
          response.blob().then(function(myBlob) {
            load(myBlob);
          });
        });
      },

      process: (fieldName, file, metadata, load, error, progress, abort) => {
          console.log(file)
        const data = new FormData();
        
        data.append('file', file);
data.append('upload_preset', 'oumaima');
data.append('cloud_name', 'dcex70obk');
data.append('public_id', file.name);

axios.post('https://api.cloudinary.com/v1_1/dcex70obk/image/upload', data)
          .then((response) => response.data)
          .then((data) => {
            
           setCategorie({...categorie,imagecategorie:data.url}) ;
            load(data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            error('Upload failed');
            abort();
          });
      },
    };
  };

  return (
    <div >
    
     <Button
     onClick={show}
     variant="danger"
     size="md"
     className="text-danger btn-link warning"
     >
    <i class="fa-solid fa-pen-to-square"></i>
    
    </Button>
    <Modal show={show} onHide={handleClose}>
 <Form noValidate validated={validated} onSubmit={handleSubmit}>
<Modal.Header closeButton>
 <h2>Modifier une catégorie</h2>
</Modal.Header>
<Modal.Body>
<div className="container w-100 d-flex justify-content-center">
<div>
<div className='form mt-3'>
<Row className="mb-2">
<Form.Group as={Col} md="12" >
<Form.Label >Nom de la catégorie *</Form.Label>
<Form.Control
required
type="text"
placeholder="Nom de la catégorie"
name="nomcategorie"
value={categorie.nomcategorie}
onChange={(e)=>handlechange(e)}
/>
<Form.Control.Feedback type="invalid">
Saisir Nom Catégorie
</Form.Control.Feedback>
</Form.Group>
</Row>
<div style={{ width: "80%", margin: "auto", padding: "1%" }}>
     <FilePond
                   files={files}
                   acceptedFileTypes="image/*"
                   onupdatefiles={setFiles}
                   allowMultiple={true}
                   server={serverOptions()}
                   name="file"
                      
          />
    </div>    

</div>
</div>
</div>
</Modal.Body>
<Modal.Footer>
<Button type="submit">Enregistrer</Button>
<Button type="button" className="btn btn-warning"
onClick={()=>handleReset()}>Annuler</Button>
</Modal.Footer>
</Form>
</Modal>
</div>
  )

}
 
export default Editcategorie
