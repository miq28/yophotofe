import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsX } from 'react-icons/bs';
import { URL_API } from '../../helper/url';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '../../redux/actions/toastActions';
import HeaderProps from '../../components/HeaderProps';

function Upload(props) {
  // if (isLoading) {
  //   return (
  //     <>
  //       <HeaderProps title="Upload Photo" link="/upload" />
  //       <div className="loader"></div>
  //     </>
  //   );
  // }
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const previewImages = () => {
    return image.map((val, index) => {
      return (
        <span
          onClick={(e) => {
            e.stopPropagation();
            // onPreviewSelect(index);
          }}
          className="image-preview-button"
        >
          <div className="image-preview-list">
            {/* {index === cover && (
              <div className="image-preview-cover">Cover</div>
            )} */}
            <img src={URL.createObjectURL(val)} alt="previewImages" />
            <button
              className="image-preview-delete"
              onClick={(e) => {
                e.stopPropagation();
                onPreviewDelete(index);
              }}
            >
              <BsX size={20} />
            </button>
          </div>
        </span>
      );
    });
  };

  // const onPreviewSelect = (index) => {
  //   setCover(index);
  // };

  const onPreviewDelete = (index) => {
    const imageFilter = image.filter((photo, i) => i !== index);
    setImage(imageFilter);
  };

  const postImage = (idCollection) => {
    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem(`token`)}` }
    };
    var imageFormData = new FormData()
    var bodyFormData = new FormData()
    bodyFormData.append('title', title)
    bodyFormData.append('description', desc)

    imageFormData.append('id_collection', idCollection)
    for (var i = 0; i < image.length; i++) {
      imageFormData.append('image', image[i])
    }
    axios
      .post(`${URL_API}/collectionImages`, imageFormData, config)
      .then(() => {
        dispatchEvent(toastSuccess('Success created a new collection!'))
        history.pushState('/collections')
      })
      .catch((err) => {
        setIsLoading(false)
        dispatchEvent(toastError(`${err.response.data.message}`))
      })
  }



  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <HeaderProps title="Upload Photo" link="/upload" />
      {/* <div className="loader"></div> */}
      <div className="cnew-main">
        <Form>
          <Form.Group>
            <Form.Label>Title*</Form.Label>
            <Form.Control
              autoFocus
              className="custom-form-port"
              type="text"
              placeholder="e.g. Leon & Stella"
              value={props.title}
              onChange={props.titleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className="custom-form-port"
              as="textarea"
              rows={4}
              type="text"
              placeholder="Type collection description"
              value={props.desc}
              onChange={props.descChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={props.onSubmitFirst}>
            Next
          </Button>
        </Form>
      </div>
      
      <div className="cnew-main">
        <div className="port-upload">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="port-upload-text">
              <div className="upload-text-1">
                <AiOutlineCloudUpload /> Upload Images
              </div>
              <div className="upload-text-2">
                Drag and drop, or click to select
              </div>
              <div className="upload-text-3">
                Accepts JPEG files up to 10MB each
              </div>
            </div>
          </div>
        </div>
        {image && (
          <div className="port-image-wrapper">
            <div className="port-image">{previewImages()}</div>
          </div>
        )}
        <div
          className={`${image ? 'port-upload-button-2' : 'port-upload-button'
            }`}
        >
          <Button variant="none" onClick="{onUploadImage}" disabled={!image}>
            Next
          </Button>
        </div>
      </div>
    </>

  );
}

export default Upload;
