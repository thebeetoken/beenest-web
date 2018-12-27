import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const ProfilePhotoUploaderContainerMobile = styled.div`
  .photo-uploader-container {
    display: none;


    .hide-uploader {
      .dz-preview {
        display: none;
      }
    }
  }
`;

const ProfilePhotoUploaderContainerTablet = styled(ProfilePhotoUploaderContainerMobile)`
  @media (min-width: 768px) { }
`;

const ProfilePhotoUploaderContainerDesktop = styled(ProfilePhotoUploaderContainerTablet)`
  @media (min-width: 1025px) {
    .photo-uploader-container {
      background-size: cover;
      background-position: center;
      border-radius: 50%;
      display: block;
      overflow: hidden;
      position: relative;
      &:after {
        border-radius: 100%;
        box-shadow: 0px 0px 0px 2000px #E3DFD2;
        content: '';
        height: 240px;
        left: 0px;
        pointer-events: none;
        position: absolute;
        top: 0px;
        width: 240px;
      }
      &:hover {
        .dz-message {
          background-color: ${color('body', 0.9)};
        }
      }
      .dz-message {
        ${typography('title', 9)};
        background-color: ${color('body', 0.6)};
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
        .dz-previow {
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
    }
  }
`;

const ProfilePhotoUploaderContainer = styled(ProfilePhotoUploaderContainerDesktop)``;

export default ProfilePhotoUploaderContainer;
