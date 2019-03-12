import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ProfilePhotoUploaderContainer = styled.div`
  .photo-uploader-container {
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    display: block;
    overflow: hidden;
    position: relative;
    .dz-message {
      ${typography('title', 9)};
      bottom: 0px;
      color: white;
      flex-direction: row-reverse;
      height: 58px;
      margin: 0 !important;
      padding: 13px 22px 21px;
      position: absolute;
      transition: all .15s ease-in-out;
      width: 207px;
      .bee-svg {
        margin-left: 8px;
      }
    }
    .hide-uploader {
      .dz-message {
        display: flex !important;
      }
      .dz-preview {
        display: none !important;
      }
    }
    .filepicker {
      background-color: ${color('body', 0)} !important;
      border: none !important;
      border-radius: 50% !important;
      height: 240px !important;
      transition: all .2s ease-in-out !important;
      width: 240px !important;
      transition: all .2s ease-in-out;
    } 
    
    @media (min-width: 1025px) {
      &:hover {
        .dz-message {
          background-color: ${color('body', 0.9)};
        }
      }
    }
  }
`;

export default ProfilePhotoUploaderContainer;
