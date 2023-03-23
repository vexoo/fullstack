sequenceDiagram
browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
server->>browser: code 302, url redirect
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
server->>browser: HTML document
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server->>browser: css file
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
server->>browser: JavaScript file
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
server->>browser: raw data