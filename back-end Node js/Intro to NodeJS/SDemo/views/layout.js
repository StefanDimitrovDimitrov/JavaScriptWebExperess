module.exports = (html, title = 'Welcome')=>`
<html>
<head>
<title>
    My Page - ${title}
</title>
</head>
    <nav>
        <a href = "/">Home</a>
        <a href = "/catalog">Catalog</a>
        <a href = "/about">About</a>
    </nav>
    <body>
    ${html}
    </body>
</html>
`
