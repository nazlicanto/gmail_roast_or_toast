# Gmail Auto Reply Chrome Extension 
Feeling lazy and tired of replying to emails? Automatically generate roast or toast replies using OpenAI with this chrome extension. This project 
is inspired by and borrows chunks of code from [this repo](https://github.com/adrienlaurent/intuitionlabs-openai-chrome/tree/main) from Intuition Labs. 

## Installation & Usage
You will need an OpenAI subscription to use this extension. Make sure to replace the API_KEY in `src/content.js` with your personal API key before installing the extension.

1. Run `npm install` to install dependencies.
2. Run `npm start` to start the development server.
3. In Chrome, go to chrome://extensions, turn on Developer mode, click "Load unpacked", and pick the "dist" directory within this project.
4. Open https://mail.google.com/ and click "Compose an email" at the top left.
5. There's a button added to Compose view right next to the send email button on Gmail
6. Open `content.js` to see the code and play with language model prompts.

You can make changes to content.js and the extension will automatically be rebuilt as long as the `npm start` command is still running. If you make any changes, then to apply them you will have to press the ⟳ Reload extension button and then refresh Gmail.

You can run `npm run build` to create an optimized production build of your extension in the "dist" directory.

## Roast & Toast Demonstrations

Toast:
![mergea](https://github.com/nazlicanto/gmail_roast_or_toast/blob/main/samples/Amerge.jpg)

and Roast:
![mergeb](https://github.com/nazlicanto/gmail_roast_or_toast/blob/main/samples/Bmerge.jpg)




 