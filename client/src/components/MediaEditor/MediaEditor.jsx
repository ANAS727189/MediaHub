import { useState } from 'react';
import EditorLayout from './core/EditorLayout';
import FeaturesGrid from './core/FeaturesGrid';
import ToolRouter from './core/ToolRouter';
import { useCloudinaryUpload } from './hooks/useCloudinaryUpload';
import { useMediaTransform } from './hooks/useMediaTransform';
import { ALL_TOOLS } from './constants/toolsConfig';

const MediaEditor = () => {
  const [activeFeature, setActiveFeature] = useState(null);

  const {
    uploading,
    uploadedFile,
    mediaUrl,
    isVideo,
    uploadFile,
    resetUpload
  } = useCloudinaryUpload();

  const {
    transformedUrl,
    transformHistory,
    generateTransformUrl,
    applyTransform,
    downloadMedia,
    resetTransforms,
    setTransformedUrl
  } = useMediaTransform();

  const handleFeatureClick = (featureId) => {
    setActiveFeature(featureId);
    resetTransforms();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const handleBackToFeatures = () => {
    setActiveFeature(null);
    resetUpload();
    resetTransforms();
  };

  const getActiveFeatureTitle = () => {
    if (!activeFeature) return "Professional Media Editor";
    
    const feature = ALL_TOOLS.find(tool => tool.id === activeFeature);
    return feature ? feature.title : "Media Tool";
  };

  return (
    <EditorLayout
      title={getActiveFeatureTitle()}
      showBackButton={!!activeFeature}
      onBack={handleBackToFeatures}
    >
      {!activeFeature ? (
        <FeaturesGrid onFeatureClick={handleFeatureClick} />
      ) : (
        <ToolRouter
          activeFeature={activeFeature}
          mediaUrl={mediaUrl}
          uploadedFile={uploadedFile}
          uploading={uploading}
          onFileUpload={handleFileUpload}
          transformedUrl={transformedUrl}
          setTransformedUrl={setTransformedUrl}
          onDownload={downloadMedia}
          generateTransformUrl={generateTransformUrl}
          resetUpload={resetUpload}
        />
      )}
    </EditorLayout>
  );
};

export default MediaEditor;
