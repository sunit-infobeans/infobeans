const { __ } = wp.i18n;
const { Modal, TextControl, Button } = wp.components;
const { useState } = wp.element;
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { isURL } = wp.url;

const ALLOWED_MEDIA_TYPES = ['image'];

const ExternalLinkModal = ({ onClose, onSave, removeFeaturedImage }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const instructions = (
    <p>{__('To upload the image, you need permission to upload media.', 'idg-base-theme')}</p>
  );

  const addClassToDialog = () => {
    return document
      .getElementsByClassName('productModal-overlay')[0]
      ?.parentElement?.parentElement?.parentElement?.classList.add('external-link-div');
  };

  const onSaveClick = () => {
    if (!isURL(url) || title.trim() === '') {
      setTitle(title.trim());
      return;
    }
    onSave({ title, url, selectedImage });
  };

  const ExternalLinkMediaUpload = () => {
    return (
      <MediaUploadCheck fallback={instructions}>
        <MediaUpload
          className="external-link-image"
          onSelect={image => setSelectedImage(image)}
          allowedTypes={ALLOWED_MEDIA_TYPES}
          value={selectedImage}
          render={({ open }) => (
            <Button
              className="editor-product-image__toggle"
              onClick={() => {
                open();
                addClassToDialog();
              }}
              isSecondary
            >
              {(selectedImage === ''
                ? __('Set', 'idg-base-theme')
                : __('Replace', 'idg-base-theme')) + __(' image', 'idg-base-theme')}
            </Button>
          )}
        />
      </MediaUploadCheck>
    );
  };
  return (
    <Modal
      title={__('Add Empty Slot', 'idg-base-theme')}
      className="productModal externalLinkModal"
      overlayClassName="productModal-overlay"
      onRequestClose={onClose}
      shouldCloseOnClickOutside={false}
    >
      <div className="productModal-body">
        <div className="productModal-layout">
          <div className="productModal-main">
            <div className="field-container">
              <p className="searchLabel">
                {__('Headline')}
                <span className="isRequired-field">*</span>
              </p>
              <TextControl
                className="searchInput"
                placeholder={__('Enter Headline', 'idg-base-theme')}
                value={title}
                onChange={setTitle}
              />
            </div>
            <div className="field-container">
              <p className="searchLabel url-container">
                {__('URL')}
                <span className="isRequired-field">*</span>
                {url && !isURL(url) && <span class="error-message">{__('Invalid URL')}</span>}
              </p>
              <TextControl
                className="searchInput"
                placeholder={__('Enter URL', 'idg-base-theme')}
                value={url}
                onChange={setUrl}
              />
            </div>
            {!removeFeaturedImage && (
              <div className="field-container">
                <p className="searchLabel">
                  {__('Featured Image')}
                  <span className="isRequired-field">*</span>
                </p>
                {selectedImage?.url && <img src={selectedImage?.url} />}
                <ExternalLinkMediaUpload />
              </div>
            )}
          </div>
          <div className="action-div">
            <Button className="cancel-button" onClick={onClose} isDestructive>
              {__('Cancel', 'idg-base-theme')}
            </Button>
            <Button
              disabled={
                !title ||
                (title && !title.trim()) ||
                !url ||
                (!removeFeaturedImage && !selectedImage)
              }
              onClick={onSaveClick}
              isPrimary
            >
              {__('Add', 'idg-base-theme')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ExternalLinkModal;
