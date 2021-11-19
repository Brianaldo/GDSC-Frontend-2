const Modal = (props) => {
//   let procDesc = props.desc.replace(/&aposTemp/g, "'");
//   let procTitle = props.title.replace(/&aposTemp/g, "'");
//   procDesc = procDesc.replace(/&quoteTemp/g, '"');
//   procTitle = procTitle.replace(/&quoteTemp/g, '"');
  return (
    <div class="modal" id="modal">
      <div class="modal-content">
        <div class="modal-content-img">
          <img src={props.img} />
        </div>
        <div class="modal-content-span">
          <h1>{props.title}</h1>
          <p>{props.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
