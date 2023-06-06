import { cloneDeep } from 'lodash-es';

const { __ } = wp.i18n;
const { RichText } = wp.editor;
const { useSelect, useDispatch } = wp.data;
const { Button, Modal } = wp.components;
const { useState, useEffect } = wp.element;
const I18N_DOMAIN = 'idg-b2b-base-theme';

const DisplayStatsItemsComponent = ({ attributes, setAttributes, clientId }) => {
  const { replaceInnerBlocks } = useDispatch('core/block-editor');
  const { innerBlocks } = useSelect(select => ({
    innerBlocks: select('core/block-editor').getBlocks(clientId),
  }));

  useEffect(() => {
    if (innerBlocks.length > 0) {
      replaceInnerBlocks(clientId, innerBlocks, false);
    }
  }, []);

  // Assuming that only a single host-profile can be added
  const parentBlock = wp.data
    .select('core/block-editor')
    .getBlocks()
    .find(obj => obj.name === 'idg-b2b-base-theme/stats');
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false);

  const deleteInnerBlock = () => {
    const clientIdVar = wp.data.select('core/block-editor').getSelectedBlock()?.clientId;
    const innerBlockIdx = parentBlock?.innerBlocks.findIndex(obj => obj.clientId === clientIdVar);
    const removedInnerBlock = parentBlock?.innerBlocks.splice(innerBlockIdx, 1);
    if (clientIdVar && removedInnerBlock) {
      replaceInnerBlocks(parentBlock?.clientId, parentBlock?.innerBlocks, false);
    }
    toggleDeleteModal(false);
  };

  const moveProfile = difference => {
    const clientIdVar = wp.data.select('core/block-editor').getSelectedBlock()?.clientId;
    const innerBlockIdx = parentBlock?.innerBlocks.findIndex(obj => obj.clientId === clientIdVar);

    const newIndex = innerBlockIdx + difference;

    if (parentBlock?.innerBlocks.length === newIndex || newIndex < 0) {
      return;
    }

    const newInnerBlocks = cloneDeep(parentBlock?.innerBlocks);

    const temp = newInnerBlocks[newIndex];
    newInnerBlocks[newIndex] = newInnerBlocks[innerBlockIdx];
    newInnerBlocks[innerBlockIdx] = temp;

    replaceInnerBlocks(parentBlock?.clientId, newInnerBlocks, false);
  };

  return (
    <>
      <div className="button-container">
        <div className="button-directions">
          <Button icon="arrow-up-alt2" onClick={() => moveProfile(-1)} />
          <Button icon="arrow-down-alt2" onClick={() => moveProfile(1)} />
        </div>
        <a onClick={() => toggleDeleteModal(true)} className="delete-block">
          {__('Remove', I18N_DOMAIN)}
        </a>
      </div>
      <div className="stats__stat-item">
        <RichText
          className="stats__stat"
          value={attributes.percentValue}
          placeholder={__('Stats', I18N_DOMAIN)}
          tagName="p"
          onChange={val => setAttributes({ percentValue: val })}
        />
        <RichText
          className="stats__content"
          value={attributes.description}
          placeholder={__('Description', I18N_DOMAIN)}
          tagName="p"
          onChange={val => setAttributes({ description: val })}
        />
        {isDeleteModalOpen && (
          <Modal
            title={__('Remove Stat', I18N_DOMAIN)}
            className="confirmationModal"
            overlayClassName="productModal-overlay"
            onRequestClose={() => toggleDeleteModal(false)}
            shouldCloseOnClickOutside={false}
          >
            <div className="productModal-body">
              <div className="confirmationModal-layout">
                <div className="confirmationModal-main">
                  <p>{__('Are you sure you want to remove the block?', I18N_DOMAIN)}</p>
                </div>
                <div className="action-div">
                  <Button
                    className="cancel-button"
                    onClick={() => toggleDeleteModal(false)}
                    isDestructive
                  >
                    {__('Cancel', I18N_DOMAIN)}
                  </Button>
                  <Button onClick={deleteInnerBlock} isPrimary>
                    {__('Confirm', I18N_DOMAIN)}
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};
export default DisplayStatsItemsComponent;
