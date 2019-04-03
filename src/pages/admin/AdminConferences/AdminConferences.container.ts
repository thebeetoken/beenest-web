import styled from 'styled-components';


const AdminConferencesContainer = styled.section`
.admin-form--item {
  margin-bottom: 24px;
}

textarea {
  width: 100%;
}

/* Styles for React Tags*/
/* Styles for the input */
div.ReactTags__tagInput {
  width: 100%;
  display: inline-block;
  margin-bottom: 8px;
  margin-top: 8px;
}

div.ReactTags__tagInput input.ReactTags__tagInputField,
div.ReactTags__tagInput input.ReactTags__tagInputField:focus {
  height: 31px;
  margin: 0;
  width: 100%;
  border: 1px solid #eee;
}

/* Styles for selected tags */
div.ReactTags__selected span.ReactTags__tag {
  border: 1px solid #ddd;
  background: #eee;
  display: inline-block;
  padding: 5px;
  margin: 0 5px;
  cursor: move;
  border-radius: 2px;
}

div.ReactTags__selected a.ReactTags__remove {
  color: #aaa;
  margin-left: 5px;
  cursor: pointer;
}
`;

export default AdminConferencesContainer;
