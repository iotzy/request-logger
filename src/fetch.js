const fetch = require('node-fetch');
fetch("http://127.0.0.1:3000/flutter/zy/test", {
    method: "post",
    body: JSON.stringify({"foo": "boo"}),
    headers: {
        'content-type': 'application/json;charset=UTF-8',
        'bearer': 'Mozilla/4.0 MDN ExamplediJDBNJKadnjkDNA8912`U3892`U389DJCKNA jkcnjk9812ihfrijunvjinkdasjngjkdsngjklnjklasdbngujh2389uhruihuit2r3',
    },
})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    });
