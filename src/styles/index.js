import styled from "styled-components";

// Main Section
export const MainSection = styled.div`
  .displayHide {
    display: none;
  }
  .displayShow {
    display: block;
  }
  width: 90%;
  max-width: 90%;
  margin: 6.0625rem 0 4rem 3rem;
  .mainHeading {
    font-size: 32px;
    margin-bottom: 1rem;
    color: #2b3135;
    font-weight: 600;
  }
  .activeBtn {
    width: 200px;
    position: relative;
    width: 165px;
    height: 39px;
    font-weight: 700;
    font-size: 16px;
    background: #00b807;
    border: 1px solid #00b807;
    color: #ffffff;
    border-radius: 8px;
    &:hover {
      background: #00b807;
      border: 1px solid #00b807;
      color: #ffffff;
    }
  }
  .tabs {
    position: relative;
    .ant-tabs {
      .ant-tabs-nav {
        margin-bottom: 1.75rem;
        .ant-tabs-tab {
          padding: 0;
          &:hover {
            color: var(--Red);
          }
        }
        .ant-tabs-tab-active {
          .ant-tabs-tab-btn {
            color: var(--Red);
          }
        }
      }
      .ant-tabs-ink-bar {
        background-color: var(--Red) !important;
      }
    }
    .addBtn {
      text-decoration: none;
      background-color: var(--Red);
      color: var(--White);
      padding: 0.3rem 1rem;
      border-radius: 0.375rem;
      font-weight: 600;
      position: absolute;
      top: 0;
      right: 0;
      svg {
        font-size: 1.15rem;
      }
    }
  }
`;
// Main Section > Form Head
export const FormHead = styled.div`
  background-color: var(--White);
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  padding: 1.375rem 1.75rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  p {
    margin-bottom: 0;
  }
  svg {
    font-size: 1.25rem;
    color: var(--Gray);
    cursor: pointer;
    &:hover {
      color: var(--Red);
    }
  }
`;
// Form Section
export const FormSection = styled.div`
  background-color: var(--White);
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  margin: 0.375rem 0 2rem;
  .ant-form {
    width: 100%;
    max-width: 575px;
    margin: 0 auto;
    padding: 2.5rem 2rem 1.5rem;
    .ant-picker-input {
      input {
        &::placeholder {
          display: none;
          content: "";
        }
      }
    }
    input,
    .ant-input-number,
    .ant-picker,
    .ant-select-selector {
      width: 100%;
      border-radius: 0.375rem;
      height: 2.25rem;
      box-shadow: none;
      border-color: rgba(210, 213, 218, 1) !important;
    }
    .ant-picker {
      .ant-picker-input {
        &:hover {
          .ant-picker-suffix {
            display: flex !important;
          }
        }
      }
    }
    .ant-picker-suffix {
      display: none;
    }
    .ant-form-item {
      margin-bottom: 1.25rem;
      .ant-input-number {
        width: 100%;
      }
      .ant-form-item-label {
        padding-bottom: 0.25rem;
      }
    }
    .ant-select {
      &::after {
        content: "";
        background-image: url(/images/selectArrow.svg);
        background-repeat: no-repeat;
        width: 14px;
        height: 8px;
        position: absolute;
        right: 1rem;
        bottom: 35%;
        transition: all 250ms ease-in-out;
      }
    }
    .ant-cascader {
      &:hover {
        .ant-select-clear {
          top: 40%;
        }
        &::after {
          content: "";
          display: none;
        }
      }
    }
    .ant-select.ant-select-open {
      &::after {
        transform: rotate(180deg);
      }
    }
    .ant-select-arrow {
      display: none;
    }
    .ant-btn {
      border-color: var(--Red);
      background-color: var(--Red);
      color: var(--White);
      box-shadow: none;
      border-radius: 0.375rem;
      font-weight: 600;
      margin-top: 1rem;
    }
    .multipleInputs {
      input {
        margin-bottom: 0.75rem;
      }
    }
  }
`;
// Coverage
export const CoveragePage = styled.div`
  .ant-form {
    max-width: 100%;
  }
`;
// DocumentsSection
export const DocumentsSection = styled.div`
  background-color: var(--White);
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  margin: 0.375rem 0 3rem;
  padding: 2rem 0 0;
  display: flex;
  flex-wrap: wrap;
  .DocumentCard {
    margin: 0 1.25rem;
    text-align: center;
    img {
      width: 145px;
      height: 145px;
    }
    p {
      font-size: 0.875rem;
    }
  }
`;

// Agent Section
export const AgentSection = styled.div`
  padding: 2rem 2rem 0.5rem;
  background-color: var(--White);
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  margin: 0.375rem 0 3rem;
  .agentCard {
    img {
      width: 145px;
      height: 145px;
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 0.875rem;
    }
  }
`;
// Upload Document > Upload Start
export const UploadStart = styled.div`
  .uploadStartCard {
    padding: 1rem 2rem 3rem;
  }
`;
// Upload Document > Upload Card
export const UploadCard = styled.div`
  background-color: var(--White);
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  margin: 0.375rem 0 3rem;
  padding: 1rem 2rem 2rem;
  .ant-form {
    max-width: 100%;
    .ant-upload-select {
      width: 100%;
      border: 2px dashed var(--GraySecondary);
      background-color: unset;
      height: unset;
      padding: 1rem 0 1.25rem;
      svg {
        color: rgba(23, 23, 23, 0.5);
        font-size: 1.75rem;
        background-color: #d9d9d9;
        padding: 0.375rem;
        border-radius: 0.1875rem;
      }
      .uploadClass {
        font-weight: 500;
        margin-top: 0.5rem;
        span:first-child {
          color: var(--Red);
        }
      }
    }
  }
  .fileUploading {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .square {
      width: 16px;
      height: 16px;
      border-radius: 0.1875rem;
      background-color: var(--Red);
      opacity: 0.3;
    }
    .fileProgress {
      margin: 0 2rem;
      p {
        margin-bottom: 0;
      }
      p:first-child {
        color: #171717;
        font-weight: 500;
      }
      .ant-progress {
        margin: 0.5rem 0;
        .ant-progress-outer {
          .ant-progress-inner {
            height: 32px;
            width: 290px;
            .ant-progress-bg {
              height: 100% !important;
              background-color: var(--Red);
            }
          }
        }
        .ant-progress-text {
          display: none;
        }
      }
      p:last-child {
        color: #737373;
        font-size: 0.875rem;
      }
    }
    .cancelFile {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #fef2f2;
      color: var(--Red);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      svg {
        font-size: 1.25rem;
      }
    }
    .Inputs {
      display: flex;
      margin-top: 1.5rem;
      .ant-form-item:first-child {
        width: 223px;
      }
      .ant-form-item:last-child {
        width: 151px;
        margin: 0 2.15rem 0 1rem;
      }
    }
  }
`;
