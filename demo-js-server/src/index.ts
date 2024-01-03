const server = Bun.serve({
  port: 3000,
  hostname: "0.0.0.0",
  async fetch(request) {
    // console.log(request);
    let path = request.url
      .split("//")
      .slice(1)
      .join()
      .split("/")
      .slice(1)
      .join("/");
    if (path == "") {
      path = "index.html";
    }
    let filePath = path.split("?")[0];
    let file = await Bun.file(`./public/${filePath}`);
    let exists = await file.exists();
    // console.log({
    //   path,
    //   filePath,
    //   exists,
    // });
    if (!exists) {
      return new Response("Not found", { status: 404 });
    } else {
      let content = await file.text();
      let extension = filePath.split(".").pop();
      switch (extension) {
        case "js":
          return new Response(content, {
            headers: {
              "Content-Type": "text/javascript",
            },
          });
        case "html":
          return new Response(content, {
            headers: {
              "Content-Type": "text/html",
            },
          });
        default:
          return new Response("Invalid file type", { status: 500 });
      }
    }
  },
});

console.log(`Listening on localhost: ${server.port}`);
