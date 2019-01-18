const importSrc = (src) =>
  (document.head || document.body).appendChild(
    Object.assign(document.createElement("script"), {
      type: "text/javascript",
      src: src,
      async: true
    })
  );

export default importSrc;
