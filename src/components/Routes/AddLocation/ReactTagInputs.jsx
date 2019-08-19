import React, { useState, useMemo, useContext } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { addLocationReducer } from "../../../reducers/addLocationReducer";

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const ReactTagInputs = props => {
  const { state, dispatch } = useContext(addLocationReducer);
  const [tags, setTags] = useState([]);

  const handleDelete = i => {
    dispatch({
      type: props.type,
      payload: [
        ...tags
          .filter((tag, index) => index !== i)
          .map(tag => tag.text.charAt(0).toUpperCase() + tag.text.slice(1))
      ]
    });
  };

  const handleAddition = tag => {
    // setTags({ tags: [...tags, tag] });
    dispatch({
      type: props.type,
      payload: [
        ...[...tags, tag].map(
          tag => tag.text.charAt(0).toUpperCase() + tag.text.slice(1)
        )
      ]
    });
  };

  // useMemo(() => {
  //   dispatch({
  //     type: props.type,
  //     payload: [
  //       ...tags.map(tag => tag.text.charAt(0).toUpperCase() + tag.text.slice(1))
  //     ]
  //   });
  // }, [tags, props.type, dispatch]);

  const mapContextTagsToState = () => {
    setTags([
      ...state[props.stateKey].map(val => {
        return { id: val, text: val };
      })
    ]);
  };

  useMemo(mapContextTagsToState, [state[props.stateKey]]);

  return (
    <React.Fragment>
      <span>{props.heading}</span>
      <div className="react-inputs-wrapper">
        <ReactTags
          tags={tags}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          delimiters={delimiters}
          autocomplete={false}
          allowDragDrop={false}
          placeholder={props.placeholder}
        />
        <div
          className="amount-of-tags"
          style={tags.length >= 2 ? { color: "#1BAC77" } : {}}
        >
          {tags.length} / 2
        </div>
      </div>
    </React.Fragment>
  );
};
export default ReactTagInputs;
