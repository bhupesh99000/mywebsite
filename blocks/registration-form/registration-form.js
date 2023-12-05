function createInputField(fieldName, fieldType, fieldLabel, fieldPlaceholder) {
  const label = document.createElement('label');
  label.htmlFor = fieldName;
  const span = document.createElement('span');
  span.textContent = fieldLabel;
  const input = document.createElement('input');
  input.type = fieldType;
  input.name = fieldName;
  input.id = fieldName;
  input.placeholder = fieldPlaceholder;
  input.required = true;
  label.appendChild(span);
  label.appendChild(input);
  return label;
}

function createTextarea(fieldName, fieldLabel) {
  const label = document.createElement('label');
  label.htmlFor = fieldName;
  const span = document.createElement('span');
  span.textContent = fieldLabel;
  label.appendChild(span);

  const txtArea = document.createElement('textarea');
  txtArea.id = fieldName;
  txtArea.name = fieldName;
  txtArea.rows = 6;
  txtArea.cols = 50;

  label.appendChild(txtArea);
  return label;
}

function generateForm() {
  const formElms = [];

  // Create Heading tag
  const title = document.createElement('h2');
  title.textContent = 'Registration Form';
  formElms.push(title);

  const form = document.createElement('form');
  form.name = 'registration';
  // form.action = '/email-form.json';
  form.onsubmit = async (event) => {
    event.preventDefault();
    console.log(event.target);
    debugger;
    const data = Array.from(new FormData(event.target).entries()).reduce((obj, [key, value]) => ({
      ...obj,
      [key]: value,
    }), {});
    // const a = new URLSearchParams(new FormData(event.target)).toString();
    // https://magazine-articles--mywebsite--bhupesh99000.hlx.page/email-form.json

    const resp = await fetch('/email-form.json', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    const result = await resp.text();
    // result.then((res) => {
    //   console.log(res);
    // });
  };
  // Username Field
  const username = createInputField('username', 'text', 'User Name', 'Bhupesh');
  const email = createInputField('email', 'email', 'Email', 'test@tmp.com');
  const interests = createTextarea('interests', 'Interests');
  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Submit';
  form.appendChild(username);
  form.appendChild(email);
  form.appendChild(interests);
  form.appendChild(button);
  formElms.push(form);
  return formElms;
}

export default function decorate(block) {
  console.log('Form HTML:: ', block);
  const elements = generateForm();
  elements.forEach((element) => {
    block.appendChild(element);
  });
}
