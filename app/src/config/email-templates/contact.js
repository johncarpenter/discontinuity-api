const html = ({ name, email, company, message }) => {
  return `
<body>
    <p>Response from the website</p>
    <p>Somebody is looking for something</p>
    <p>${name}</p>
    <p>${email}</p>
    <p>${company}</p>
    <p>${message}</p>
    
</body>
`;
};

const text = ({ name, email, company, message }) => {
  return `
Hello there!

Somebody added a comment on the website; 

${name}
${email}
${company}
${message}

`;
};

export { html, text };
