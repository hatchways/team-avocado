import React from "react";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";

const PositionedInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const ImageUploader = ({ onSubmit, promptText, imageId, children }) => {
  return (
    <Tooltip title={promptText} placement="top-start">
      <div
        style={{
          position: "relative",
          display: "inline-block",
          cursor: "pointer",
          width: "100%"
        }}
      >
        <PositionedInput
          accept="image/*"
          id={imageId}
          multiple
          type="file"
          onChange={onSubmit}
        />
        {children}
      </div>
    </Tooltip>
  );
};

export default ImageUploader;
