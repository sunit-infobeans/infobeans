const { InnerBlocks } = wp.editor;

const SaveStatsItemComponent = () => {
  return (
    <div className="stats__stat-item">
      <InnerBlocks.Content />
    </div>
  );
};

export default SaveStatsItemComponent;
